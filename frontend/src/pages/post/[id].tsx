import type { NextPage } from "next";
import Head from 'next/head'
import PostDetail from "../../components/post/PostDetail";
import styles from '../../styles/CreatePost.module.scss'
import { Stack } from "@chakra-ui/react";
import { useEffect, useState, useCallback } from "react";
import { Comment } from '../../types/Comment'
import { gql, useQuery, useMutation } from "@apollo/client";
import { MutationCreateCommentArgs } from "../../generated/graphql"
import axios from "axios"
import { Rating } from "../../types/Rating"
import { useSession, getSession } from "next-auth/react"
import { ME } from "../../graphql/me"

// const postData = [
//     {
//         title: "Newest Post 1",
//         author: "Name Lastname",
//         contact: "contact",
//         permission: "private",
//         description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley",
//         createDate: "09/02/2565",
//         imgUrl: "http://www.168virtualschool.com/images/No_image_available.png",
//         tag: [
//             "Tag1",
//             "Tag2",
//             "Tag3",
//             "Tag4",
//             "Tag5",
//         ],
//         rating: 4,
//         avgRating: 4,
//         comment: [
//             {
//                 author: "Name Lastname",
//                 createdDate: new Date(),
//                 comment: "Good",
//             }
//         ]
//     },
//     {
//         title: "Newest Post 2",
//         author: "Name Lastname",
//         contact: "contact",
//         permission: "private",
//         description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley",
//         createDate: "09/02/2565",
//         imgUrl: "http://www.168virtualschool.com/images/No_image_available.png",
//         tag: [
//             "Tag1",
//             "Tag2",
//             "Tag3",
//             "Tag4",
//             "Tag5",
//         ],
//         rating: 3,
//         avgRating: 4,
//         comment: [
//             {
//                 author: "Name Lastname",
//                 createdDate: new Date(),
//                 comment: "Good",
//             }
//         ]
//     },
//     {
//         title: "Newest Post 3",
//         author: "Name Lastname",
//         contact: "contact",
//         permission: "private",
//         description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley",
//         createDate: "09/02/2565",
//         imgUrl: "http://www.168virtualschool.com/images/No_image_available.png",
//         tag: [
//             "Tag1",
//             "Tag2",
//             "Tag3",
//             "Tag4",
//             "Tag5",
//         ],
//         rating: 5,
//         avgRating: 4,
//         comment: [
//             {
//                 author: "Name Lastname",
//                 createdDate: new Date(),
//                 comment: "Good",
//             }
//         ]
//     },
//     {
//         title: "Newest Post 3",
//         author: "Name Lastname",
//         contact: "contact",
//         permission: "private",
//         description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley",
//         createDate: "09/02/2565",
//         imgUrl: "http://www.168virtualschool.com/images/No_image_available.png",
//         tag: [
//             "Tag1",
//             "Tag2",
//             "Tag3",
//             "Tag4",
//             "Tag5",
//         ],
//         rating: 5,
//         avgRating: 4,
//         comment: [
//             {
//                 author: "Name Lastname",
//                 createdDate: new Date(),
//                 comment: "Good",
//             }
//         ]
//     },
// ]

interface Props {
    id: string,
}

const GET_POST_BY_ID = gql`
    query Post($id: MongoID!){
        postById(_id : $id) {
            title
            document
            status
            authorId
            description
            file
            author {
                firstName
                lastName
                email
                image
            }
            tags{
                name
            }
            ratings{
                rating
                userId
            }
            ratingAvg
            images
            comments{
                _id
                comment
                authorId
                createdAt
                author{
                    firstName
                    lastName
                    image
                    _id
                }
            }
        }
    }
`

const CREATE_COMMENT = gql`
    mutation Comment($comment:String!, $postId:MongoID!){
        createComment(comment: $comment, postId: $postId){
            comment
            author{
                email
            }
        },
    }
`

const CREATE_RATING = gql`
    mutation ($rating:Float!, $postId:MongoID!){
        addRating(rating: $rating, postId: $postId){
    	    userId
            rating
        },
    }
`

const DELETE_COMMENT = gql`
    mutation ($commentId:MongoID!){
        deleteComment(commentId: $commentId){
            message
        },
    }
`
const PostDetailPage: NextPage<Props> = ({ id }) => {
    const [createCommentMutation] = useMutation(CREATE_COMMENT)
    const [createRatingMutation] = useMutation(CREATE_RATING)
    const [deleteCommentMutation] = useMutation(DELETE_COMMENT)

    const [myId, setMyId] = useState("")
    const [myRating, setMyRating] = useState(0)
    const [owner, setOwner] = useState(false)

    const { loading, error, data, refetch } = useQuery(GET_POST_BY_ID, {
        variables: { id }
    })

    const { loading:meLoading, error:meError, data:meData, refetch:meRefetch } = useQuery(ME)

    const getMyId = useCallback(async () => {
        if(meData){
            if (meData._id === data?.postById.authorId) {
                setOwner(true)
            }
            setMyId(meData._id)
        }
    }, [meData, data])

    const getMyRating = useCallback(() => {
        const myRating = data?.postById.ratings.filter((r: Rating) => r.userId === myId)
        setMyRating(myRating.length ? myRating[0].rating : 0)
    }, [data, myId])

    useEffect(() => {
        getMyId()
    }, [getMyId])

    useEffect(() => {
        if (data) {
            getMyRating()
        }
    }, [data, getMyRating])

    const handleComment = async (newComment: string) => {
        try {
            const { data: createCommentData } = await createCommentMutation({ variables: { comment: newComment, postId: id } })
            refetch()
        } catch (err) {
            console.log(err)
        }
    }

    const handleCreateRating = async (rating: number) => {
        try {
            const { data: createRatingData } = await createRatingMutation({ variables: { rating: rating, postId: id } })
            refetch()
        } catch (err) {
            console.log(err)
        }
    }


    const deleteComment = async (id: string) => {
        try {
            const { data: deleteCommentData } = await deleteCommentMutation({ variables: { commentId: id } })
            refetch()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <Head>
                <title>Post Detail</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Stack className={styles.container}>
                <PostDetail
                    post={data?.postById}
                    addComment={(newComment: string) => handleComment(newComment)}
                    ratePost={(rating: number) => handleCreateRating(rating)}
                    deleteComment={(comment: string) => deleteComment(comment)}
                    myRating={myRating}
                    owner={owner}
                    myId={myId}
                />
            </Stack>
        </div>
    )
}
export const getServerSideProps = async (context: any) => {
    const { id } = context.query;
    return {
        props: {
            id,
        },
    };
};

export default PostDetailPage