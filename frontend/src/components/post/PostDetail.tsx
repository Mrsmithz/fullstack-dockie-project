import React, { useEffect, useState } from "react";
import { StarIcon } from '@chakra-ui/icons'
import {
    Box,
    Text,
    Center,
    useColorModeValue,
    Image,
    Stack,
    Grid,
    GridItem,
    Flex,
    Tag,
    SimpleGrid,
    Button,
    Input,
    useDisclosure,
    IconButton,
    Avatar,
    HStack,
    Link
} from "@chakra-ui/react";
import RatingModal from './RatingModal'
import DeleteCommentModal from './DeleteCommentModal'
import { DeleteIcon } from '@chakra-ui/icons'

import { Comment } from "../../types/Comment"
import { Post } from "../../types/Post"
import { Tag as TagType } from '../../types/Tag'
import { useSession } from "next-auth/react"
import {
    checkComment
} from '../../utils/feedbackPost';
import axios from "axios"
import { useRouter } from 'next/router';

import ImageModal from "../modal/ImageModal"

// import Link from "next/link"

const size = { base: "100%", md: "80%", lg: "60%" };

type Props = {
    addComment: Function
    ratePost: Function
    deleteComment: Function,
    post: Post,
    myRating: number,
    owner: boolean,
    myId: string
}

const PostDetail = ({ addComment, ratePost, deleteComment, post, myRating, owner, myId }: Props) => {
    const { data: token, status } = useSession()

    const router = useRouter()

    const [newComment, setNewComment] = useState("");
    const [rating, setRating] = useState(myRating);
    const [newRating, setNewRating] = useState(0);
    const [deleteCommentId, setDeleteCommentId] = useState("");

    const [modalImage, setModalImage] = useState("")
    const [openModal, setOpenModal] = useState<boolean>(false)

    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)

    const [updateKey, setUpdateKey] = useState(0);

    const { isOpen, onOpen, onClose } = useDisclosure()
    // const {
    //     isOpen: isOpenDeleteModal,
    //     onOpen: onOpenDeleteModal,
    //     onClose: onCloseDeleteModal
    // } = useDisclosure()


    const renderAvgRating = (rating?: any) => {
        var starList: any[] = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                starList.push(
                    <StarIcon color="white" key={`newest-${i}`} />
                )
            } else {
                starList.push(
                    <StarIcon color="black" key={`newest-${i}`} />
                )
            }
        }
        return starList;
    }

    const renderRating = (rating: number) => {
        var starList: any[] = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                starList.push(
                    <StarIcon color="white" key={`newest-${i}`} onClick={() => handleRating(i)} cursor="pointer" />
                )
            } else {
                starList.push(
                    <StarIcon color="black" key={`newest-${i}`} onClick={() => handleRating(i)} cursor="pointer" />
                )
            }
        }
        return starList;
    }

    useEffect(()=>{
        setRating(myRating)
    }, [myRating])
    const zeroPad = (num: number, places: number) => String(num).padStart(places, '0')

    // const formatCommentDate = (date: Date) => {
    //     return date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate() + " " + zeroPad(date.getHours(), 2) + ":" + zeroPad(date.getMinutes(), 2);
    // }

    const handleModal = (img: string) => {
        setModalImage(img)
        setOpenModal(true)
    }

    const addNewComment = () => {
        if (checkComment(newComment.trim()) === "") {
            addComment(newComment)
            setUpdateKey(updateKey + 1)
            setNewComment("")
        }
    }

    const handleRating = (newRating: number) => {
        if (newRating !== myRating) {
            setNewRating(newRating)
            onOpen()
        }
    }

    const handleRatingModal = () => {
        ratePost(newRating)
        setRating(newRating)
        onClose()
        setUpdateKey(updateKey + 1)
    }

    const handleDeleteButton = (id: string) => {
        setDeleteCommentId(id)
        setOpenDeleteModal(true)
    }

    const handleDeleteModal = () => {
        deleteComment(deleteCommentId)
        setOpenDeleteModal(false)
    }
    const backgroundDetailPostColor = useColorModeValue("blue.100", "gray.500")
    const commentBoxColor = useColorModeValue("blue.200", "gray.400");
    const backgroundTitleAndDesColor = useColorModeValue("gray.100", "gray.600")
    const backgroundDesColor = useColorModeValue("blue.200", "gray.700")

    return (
        <>
            <Stack>
                <Center
                    w={size}
                    bg={backgroundDetailPostColor}
                    p={{ base: 5, lg: 10 }}
                    borderRadius={20}
                    alignSelf="center"
                    mt={5}
                    h={"100%"}
                    key={updateKey}
                >
                    <Grid templateColumns="repeat(12, 1fr)">
                        <GridItem colSpan={{ base: 12, lg: 3, md: 12, sm: 12 }}>
                            <Flex justify="center" align="center">
                                <Link href={`/profile/${post?.authorId}`}>
                                    <Avatar
                                        src={
                                            post?.author.image
                                        }
                                        cursor={'pointer'}
                                        boxSize={{ base: 200, lg: 200, md: 400, sm: 400 }}
                                    />
                                </Link>
                            </Flex>
                            <Center mt={2}>
                                <Text fontSize={{ base: 20, lg: 20, md: 40, sm: 40 }}>
                                    {post?.author.firstName} {post?.author.lastName}
                                </Text>
                            </Center>
                            <Center>
                                <Text fontSize={{ base: 20, lg: 20, md: 40, sm: 40 }}>
                                    {post?.author.email}
                                </Text>
                            </Center>
                        </GridItem>
                        <GridItem colSpan={1}></GridItem>
                        <GridItem colSpan={{ base: 12, lg: 8, md: 12, sm: 12 }}>
                            <Box
                                w={"100%"}
                                p={5}
                                bg={backgroundTitleAndDesColor}
                                borderRadius={20}
                            >
                                <Text fontSize={20}>Title : {post?.title}</Text>
                                <Text fontSize={20}>Description</Text>
                                <Box
                                    bg={backgroundDesColor}
                                    p={3}
                                    borderRadius={10}
                                    minH="8rem"
                                    mt={2}
                                    mb={5}
                                    h={200}
                                    overflowY="auto"
                                >
                                    <Text fontSize={15}> {post?.description} </Text>
                                </Box>
                                <Grid templateColumns="repeat(12, 1fr)">
                                    <GridItem
                                        colSpan={{ base: 1, lg: 1, md: 12, sm: 12 }}
                                        textAlign="center"
                                    >
                                        <Text>Tag</Text>
                                    </GridItem>
                                    <GridItem colSpan={10}>
                                        {post?.tags.map((item: TagType, index: number) => (
                                            <Tag ml={2} colorScheme="teal" key={`tag-${index}`}>
                                                {item.name}
                                            </Tag>
                                        ))}
                                    </GridItem>
                                </Grid>
                                <Text fontSize={16} marginTop="0.5rem" paddingLeft="0.5rem">Permission : {post?.status} </Text>
                                <Box marginTop="0.25rem" paddingLeft="0.5rem">
                                    <HStack>
                                        <Text>Average Rating :</Text>
                                        <Stack direction="row" pr={10}>
                                            {renderAvgRating(post?.ratingAvg)}
                                        </Stack>
                                        {/* <Text paddingLeft="0.6rem">From ... User</Text> */}
                                    </HStack>
                                </Box>
                            </Box>
                            <Center mt={5}>
                                <Stack direction="row" display="flex" alignItems="center">
                                    <Text>Your Rating : </Text>
                                    <Stack direction="row" pr={10}>
                                        {renderRating(rating)}
                                    </Stack>
                                </Stack>
                            </Center>
                        </GridItem>
                        <GridItem
                            colSpan={{ base: 12, lg: 3, md: 12, sm: 12 }}
                            mt={{ base: 10, lg: 5 }}
                        >
                            <Center h={"100%"}>
                                <Button colorScheme="blue" variant="solid" onClick={() => router.push(`${process.env.NEXT_PUBLIC_API_LINK}/file/${post.file}`)}>
                                    Download File
                                </Button>
                            </Center>
                        </GridItem>
                        <GridItem colSpan={1}></GridItem>
                        <GridItem colSpan={{ base: 12, lg: 8, md: 12, sm: 12 }} mt={5}>
                            <Text fontSize={20}>Preview</Text>
                            <SimpleGrid columns={3} spacing={4} mt={2}>
                                {
                                    post && post?.images.map((image: string) => {
                                        return (
                                            <Box bg={"gray.300"} h={{ base: 150, lg: 220 }} key={image}>
                                                <Image
                                                    src={`${process.env.NEXT_PUBLIC_API_LINK}/file/${image}`}
                                                    h={'100%'}
                                                    w={'100%'}
                                                    transitionDuration={'0.2s'}
                                                    _hover={{
                                                        transform: 'scale(1.02)',
                                                        transitionDuration: '0.2s'
                                                    }}
                                                    _active={{
                                                        transform: 'scale(0.98)',
                                                        transitionDuration: '0.2s'
                                                    }}
                                                    cursor={'pointer'}
                                                    alt={"preview image"}
                                                    onClick={() => handleModal(`${process.env.NEXT_PUBLIC_API_LINK}/file/${image}`)}
                                                />
                                            </Box>
                                        )
                                    })
                                }

                            </SimpleGrid>
                        </GridItem>

                        {/* Comment Section */}
                        <GridItem colSpan={12} mt={3} pl={{ base: 1, lg: 5 }}>
                            <Text fontSize={20}>Comment</Text>
                        </GridItem>

                        {/* User Comment */}
                        <GridItem colSpan={12} m={3} pl={{ base: 1, lg: 5 }}>
                            {post?.comments.map((item: Comment, index: number) => (
                                <Grid
                                    templateColumns="repeat(12, 1fr)"
                                    bg={commentBoxColor}
                                    p={{ base: 2, lg: 3 }}
                                    borderRadius={10}
                                    mb={3}
                                    position="relative"
                                    key={`comment-${index}`}
                                >
                                    <GridItem colSpan={{ base: 12, lg: 2, md: 3, sm: 12 }} alignSelf={'center'}>
                                        <Center>
                                            <Link
                                                href={`/profile/${item?.authorId}`}
                                                _focus={{}}
                                            >
                                                <Avatar
                                                    src={
                                                        item.author.image
                                                    }
                                                    boxSize={10}
                                                />
                                            </Link>
                                        </Center>
                                    </GridItem>
                                    <GridItem colSpan={{ base: 12, lg: 10, md: 9, sm: 12 }} textAlign={{ base: "center", md: "start" }}>
                                        <HStack>
                                            <Link href={`/profile/${item?.authorId}`}>{`${item.author.firstName} ${item.author.lastName}`}</Link>
                                            <Text>
                                                {item.createdAt}
                                            </Text>
                                        </HStack>
                                        <Text>{item.comment}</Text>
                                    </GridItem>
                                    {owner ?
                                        <IconButton
                                            colorScheme='red'
                                            aria-label='Delete comment'
                                            size="sm"
                                            width={8}
                                            position="absolute"
                                            right="0.5rem"
                                            top="0.5rem"
                                            icon={<DeleteIcon />}
                                            onClick={() => handleDeleteButton(item._id)}
                                        />
                                        : item?.authorId === myId &&
                                        <IconButton
                                            colorScheme='red'
                                            aria-label='Delete comment'
                                            size="sm"
                                            width={8}
                                            position="absolute"
                                            right="0.5rem"
                                            top="0.5rem"
                                            icon={<DeleteIcon />}
                                            onClick={() => handleDeleteButton(item._id)}
                                        />
                                    }
                                </Grid>
                            ))}
                        </GridItem>

                        <GridItem colSpan={{ base: 12, lg: 2, sm: 12 }} mt={5}>
                        </GridItem>
                        <GridItem colSpan={{ base: 12, lg: 7, sm: 12 }} mt={1}>
                            <Input
                                backgroundColor={"gray.600"}
                                onChange={(e) => setNewComment(e.target.value)}
                                value={newComment}
                            />
                        </GridItem>
                        <GridItem colSpan={{ base: 12, lg: 3, sm: 12 }} mt={1}>
                            <Center mt={{ base: 1, lg: 0, sm: 3 }}>
                                <Button
                                    colorScheme="blue" variant="solid" width={{ base: "100%", lg: "70%", sm: "100%" }}
                                    onClick={() => addNewComment()}
                                >
                                    Comment
                                </Button>
                            </Center>
                        </GridItem>
                    </Grid>
                </Center>
            </Stack>

            <RatingModal
                isOpen={isOpen}
                onClose={() => onClose()}
                newRating={newRating}
                handleRatingModal={() => handleRatingModal()}
            />

            <DeleteCommentModal
                isOpen={openDeleteModal}
                onClose={() => setOpenDeleteModal(false)}
                handleDeleteModal={() => handleDeleteModal()}
            />

            <ImageModal imageSrc={modalImage} isOpen={openModal} setOpen={(value: boolean) => setOpenModal(value)}></ImageModal>
        </>
    );
};

export default PostDetail;
