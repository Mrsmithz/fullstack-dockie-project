import type { NextPage } from "next";
import Head from 'next/head'
import PostDetail from "../../components/post/PostDetail";
import styles from '../../styles/CreatePost.module.scss'
import { Stack } from "@chakra-ui/react";
import { useEffect, useState} from "react";
import { Comment } from '../../types/Comment'
import { gql, useQuery} from "@apollo/client";
const postData = [
    {
        title: "Newest Post 1",
        author: "Name Lastname",
        contact: "contact",
        permission: "private",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley",
        createDate: "09/02/2565",
        imgUrl: "http://www.168virtualschool.com/images/No_image_available.png",
        tag: [
            "Tag1",
            "Tag2",
            "Tag3",
            "Tag4",
            "Tag5",
        ],
        rating: 4,
        avgRating: 4,
        comment: [
            {
                author: "Name Lastname",
                createdDate: new Date(),
                comment: "Good",
            }
        ]
    },
    {
        title: "Newest Post 2",
        author: "Name Lastname",
        contact: "contact",
        permission: "private",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley",
        createDate: "09/02/2565",
        imgUrl: "http://www.168virtualschool.com/images/No_image_available.png",
        tag: [
            "Tag1",
            "Tag2",
            "Tag3",
            "Tag4",
            "Tag5",
        ],
        rating: 3,
        avgRating: 4,
        comment: [
            {
                author: "Name Lastname",
                createdDate: new Date(),
                comment: "Good",
            }
        ]
    },
    {
        title: "Newest Post 3",
        author: "Name Lastname",
        contact: "contact",
        permission: "private",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley",
        createDate: "09/02/2565",
        imgUrl: "http://www.168virtualschool.com/images/No_image_available.png",
        tag: [
            "Tag1",
            "Tag2",
            "Tag3",
            "Tag4",
            "Tag5",
        ],
        rating: 5,
        avgRating: 4,
        comment: [
            {
                author: "Name Lastname",
                createdDate: new Date(),
                comment: "Good",
            }
        ]
    },
    {
        title: "Newest Post 3",
        author: "Name Lastname",
        contact: "contact",
        permission: "private",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley",
        createDate: "09/02/2565",
        imgUrl: "http://www.168virtualschool.com/images/No_image_available.png",
        tag: [
            "Tag1",
            "Tag2",
            "Tag3",
            "Tag4",
            "Tag5",
        ],
        rating: 5,
        avgRating: 4,
        comment: [
            {
                author: "Name Lastname",
                createdDate: new Date(),
                comment: "Good",
            }
        ]
    },
]

interface Props {
    id: string
}

const GET_POST_BY_ID = gql`
    query Post($id: MongoID!){
        postById(_id : $id) {
            title,
            document,
            status
        }
    }
`
const PostDetailPage: NextPage<Props> = ({ id }) => {
    const addComment = (newComment: string) => {
        const newCommentData = {
            author: "Name Lastname",
            createdDate: new Date(),
            comment: newComment,
        }
        postData[1].comment.push(newCommentData);
    }

    const ratePost = (newRating : number) => {
        postData[1].rating = newRating
    }

    const deleteComment = (comment: Comment) => {
        const index = postData[1].comment.indexOf(comment)
        postData[1].comment.splice(index, 1)
    }
    const { loading, error, data} = useQuery(GET_POST_BY_ID, {
        variables: { id }
    })
    return (
        <div>
            <Head>
                <title>Post Detail</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Stack className={styles.container}>
                <PostDetail
                    Detail={data?.postById}
                    postData={postData[1]}
                    addComment={(newComment: string) => addComment(newComment)}
                    ratePost={(newRating: number) => ratePost(newRating)}
                    deleteComment={(comment: Comment) => deleteComment(comment)}
                />
            </Stack>
        </div>
    )
}
export const getServerSideProps = (context: any) => {
    const { id } = context.query;
    return {
        props: {
            id,
        },
    };
};

export default PostDetailPage