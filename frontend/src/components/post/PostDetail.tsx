import React, { useState } from "react";
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
} from "@chakra-ui/react";
import RatingModal from './RatingModal'
import DeleteCommentModal from './DeleteCommentModal'
import { DeleteIcon } from '@chakra-ui/icons'

import { Comment } from "../../types/Comment"

import {
    checkComment
  } from '../../utils/feedbackPost';

const size = { base: "100%", md: "80%", lg: "60%" };

type Props = {
    postData: any
    addComment: Function
    ratePost: Function
    deleteComment: Function,
    Detail: any
}

const PostDetail = ({ postData, addComment, ratePost, deleteComment, Detail}: Props) => {

    const [newComment, setNewComment] = useState("");
    const [rating, setRating] = useState(postData.ratings);
    const [newRating, setNewRating] = useState(0);

    const [deleteCommentTemp, setDeleteCommentTemp] = useState({});

    const [updateKey, setUpdateKey] = useState(0);

    const { isOpen, onOpen, onClose } = useDisclosure()
    const {
        isOpen: isOpenDeleteModal,
        onOpen: onOpenDeleteModal,
        onClose: onCloseDeleteModal
    } = useDisclosure()

    const renderAvgRating = (rating: number) => {
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

    const zeroPad = (num :number, places :number) => String(num).padStart(places, '0')

    const formatCommentDate = (date: Date) => {
        return date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate() + " " + zeroPad(date.getHours(), 2) + ":" + zeroPad(date.getMinutes(), 2);
    }

    const addNewComment = () => {
        if (checkComment(newComment.trim()) === "") {
            addComment(newComment)
            setUpdateKey(updateKey + 1)
            setNewComment("")
        }
    }

    const handleRating = (newRating: number) => {
        if (newRating !== rating) {
            setNewRating(newRating)
            onOpen()
        }
    }

    const handleRatingModal = () => {
        setRating(newRating)
        ratePost(newRating)
        onClose()
        setUpdateKey(updateKey + 1)
    }

    const handleDeleteButton = (comment: Comment) => {
        setDeleteCommentTemp(comment)
        onOpenDeleteModal()
    }

    const handleDeleteModal = () => {
        deleteComment(deleteCommentTemp)
        onCloseDeleteModal()
        setUpdateKey(updateKey + 1)
    }

    const commentBoxColor = useColorModeValue("blue.200", "gray.400");

    return (
        <>
            <Stack>
                <Center
                    w={size}
                    bg={useColorModeValue("blue.100", "gray.500")}
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
                                <Image
                                    src={
                                        postData.imgUrl
                                    }
                                    alt="image"
                                    boxSize={{ base: 200, lg: 200, md: 400, sm: 400 }}
                                />
                            </Flex>
                            <Center mt={2}>
                                <Text fontSize={{ base: 20, lg: 20, md: 40, sm: 40 }}>
                                    {postData.author}
                                </Text>
                            </Center>
                            <Center>
                                <Text fontSize={{ base: 20, lg: 20, md: 40, sm: 40 }}>
                                    {postData.contact}
                                </Text>
                            </Center>
                        </GridItem>
                        <GridItem colSpan={1}></GridItem>
                        <GridItem colSpan={{ base: 12, lg: 8, md: 12, sm: 12 }}>
                            <Box
                                w={"100%"}
                                p={5}
                                bg={useColorModeValue("gray.100", "gray.600")}
                                borderRadius={20}
                            >
                                <Text fontSize={20}>Title : {Detail?.title}</Text>
                                <Text fontSize={20}>Description</Text>
                                <Box
                                    bg={useColorModeValue("blue.200", "gray.700")}
                                    p={3}
                                    borderRadius={10}
                                    minH="8rem"
                                    mt={2}
                                    mb={5}
                                >
                                    <Text fontSize={15}> {Detail?.document.text} </Text>
                                </Box>
                                <Grid templateColumns="repeat(12, 1fr)">
                                    <GridItem
                                        colSpan={{ base: 1, lg: 1, md: 12, sm: 12 }}
                                        textAlign="center"
                                    >
                                        <Text>Tag</Text>
                                    </GridItem>
                                    <GridItem colSpan={10}>
                                        {postData.tag.map((item: any, index: number) => (
                                            <Tag ml={2} colorScheme="teal" key={`tag-${index}`}>
                                                {item}
                                            </Tag>
                                        ))}
                                    </GridItem>
                                </Grid>
                                <Text fontSize={16} marginTop="0.5rem" paddingLeft="0.5rem">Permission : {Detail?.status} </Text>
                                <Box marginTop="0.25rem" paddingLeft="0.75rem">
                                    <Text>Average Rating</Text>
                                    <Stack direction="row" pr={10}>
                                        {renderAvgRating(postData.avgRating)}
                                    </Stack>
                                    <Text paddingLeft="0.6rem">From ... User</Text>
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
                                <Button colorScheme="blue" variant="solid">
                                    Download File
                                </Button>
                            </Center>
                        </GridItem>
                        <GridItem colSpan={1}></GridItem>
                        <GridItem colSpan={{ base: 12, lg: 8, md: 12, sm: 12 }} mt={5}>
                            <Text fontSize={20}>Preview</Text>
                            <SimpleGrid columns={3} spacing={4}>

                                <Box bg={"gray.300"} h={{ base: 150, lg: 220 }}></Box>
                                <Box bg={"gray.300"} h={{ base: 150, lg: 220 }}></Box>
                                <Box bg={"gray.300"} h={{ base: 150, lg: 220 }}></Box>
                            </SimpleGrid>
                        </GridItem>

                        {/* Comment Section */}
                        <GridItem colSpan={12} mt={3} pl={{ base: 1, lg: 5 }}>
                            <Text fontSize={20}>Comment</Text>
                        </GridItem>

                        {/* User Comment */}
                        <GridItem colSpan={12} m={3} pl={{ base: 1, lg: 5 }}>
                            {postData.comment.map((item: Comment, index: number) => (
                                <Grid
                                    templateColumns="repeat(12, 1fr)"
                                    bg={commentBoxColor}
                                    p={{ base: 2, lg: 3 }}
                                    borderRadius={10}
                                    mb={3}
                                    position="relative"
                                    key={`comment-${index}`}
                                >
                                    <GridItem colSpan={{ base: 12, lg: 2, md: 3, sm: 12 }} >
                                        <Center>
                                            <Image
                                                src={
                                                    postData.imgUrl
                                                }
                                                alt="image"
                                                boxSize={20}
                                            />
                                        </Center>
                                    </GridItem>
                                    <GridItem colSpan={{ base: 12, lg: 10, md: 9, sm: 12 }} mt={5} textAlign={{ base: "center", md: "start" }}>
                                        <Text>{item.author} {formatCommentDate(item.createdDate)} </Text>
                                        <Text>{item.comment}</Text>
                                    </GridItem>
                                    <IconButton
                                        colorScheme='red'
                                        aria-label='Delete comment'
                                        size="sm"
                                        width={8}
                                        position="absolute"
                                        right="0.5rem"
                                        top="0.5rem"
                                        icon={<DeleteIcon />}
                                        onClick={() => handleDeleteButton(item)}
                                    />
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
                onClose={() => onClose}
                newRating={newRating}
                handleRatingModal={() => handleRatingModal()}
            />

            <DeleteCommentModal
                isOpen={isOpenDeleteModal}
                onClose={() => onCloseDeleteModal}
                handleDeleteModal={() => handleDeleteModal()}
            />
        </>
    );
};

export default PostDetail;
