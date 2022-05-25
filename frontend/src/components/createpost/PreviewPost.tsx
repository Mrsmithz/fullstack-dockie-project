import React from "react";
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
  HStack,
  Avatar
} from "@chakra-ui/react";
import Link from "next/link";
import axios from 'axios'
import { useRouter } from 'next/router'

import styles from '../../styles/CreatePost.module.scss'

import { CreatedPost } from '../../types/CreatedPost'
import { useSession,getSession, signIn, signOut } from "next-auth/react"

type Props = {
  postData: CreatedPost,
  document: {
    fileId: string,
    text: string,
    title: string[]
  },
  backPage: Function,
  file: File
};

const size = { base: "100%", md: "80%", lg: "60%" };

const API_LINK = process.env.NEXT_PUBLIC_API_LINK

const PreviewPost = ({ postData, document, backPage, file }: Props) => {
  const { data: token, status } = useSession()

  const createPost = async () => {
    console.log(postData);
    const formData = new FormData()
    for (let i = 0; i < postData.image.length; i++) {
      formData.append("images", postData.image[i])
    }
    if(postData.titleType === "2"){
      formData.append("title", postData.title)
    }else if(postData.titleType === "1"){
      formData.append("title", postData.titleOcr)
    }
    formData.append("status", postData.permission)
    formData.append("description", postData.description)
    formData.append("document", JSON.stringify(document))
    axios.defaults.headers.common["Authorization"] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOGI4YjE0MWZhMTYxNzE2N2QzODk5OSIsImlhdCI6MTY1MzQ2ODY2MywiZXhwIjoxNjU0MDczNDYzfQ.cJ7cy7IsPvmCZwuQ7PxSddBLYfJ2Pm5NW2ruV3aIDLA`
    const res = await axios.post(`${API_LINK}/post/create`, formData)
    console.log(res.data, "bn")
    router.push('/')
  }

  const router = useRouter()

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
        >
          <Grid templateColumns="repeat(12, 1fr)">
            <GridItem colSpan={{ base: 12, lg: 3, md: 12, sm: 12 }}>
              <Flex justify="center" align="center">
                <Avatar
                  src={
                    token?.user?.image ? token.user.image : "http://www.168virtualschool.com/images/No_image_available.png"
                  }
                  boxSize={{ base: 150, lg: 150, md: 200, sm: 200 }}
                />
              </Flex>
              <Center mt={2}>
                <Text fontSize={{ base: 20, lg: 20, md: 40, sm: 40 }}>
                  {token?.user?.name}
                </Text>
              </Center>
              <Center>
                <Text fontSize={{ base: 20, lg: 20, md: 40, sm: 40 }} >
                  <div id="contact">
                    {postData.contact}
                  </div>

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
                <HStack>
                <Text fontSize={20}>Title :  </Text>
                <div id="title">{postData.titleType === "1" ? postData.titleOcr : postData.title}</div>
                </HStack>

                <Text fontSize={20}>Description</Text>
                <Box
                  bg={useColorModeValue("blue.200", "gray.700")}
                  p={3}
                  borderRadius={10}
                  minH="8rem"
                  mt={2}
                  mb={5}
                >
                  <Text fontSize={15}> <div id="description">{postData.description}</div> </Text>
                </Box>
                <Grid templateColumns="repeat(12, 1fr)">
                  <GridItem
                    colSpan={{ base: 1, lg: 1, md: 12, sm: 12 }}
                    textAlign="center"
                  >
                    <Text>Tag</Text>
                  </GridItem>
                  <GridItem colSpan={10}>
                    {/* <Tag ml={2} colorScheme="teal">
                      Tag 1
                    </Tag>
                    <Tag ml={2} colorScheme="teal">
                      Tag 2
                    </Tag>
                    <Tag ml={2} colorScheme="teal">
                      Tag 3
                    </Tag> */}

                    {postData.tag.map((item, index) => (
                      <Tag ml={2} colorScheme="teal" key={`tag-${index}`}>
                        { item}
                      </Tag>
                    ))}
                  </GridItem>
                </Grid>
                <Text fontSize={16} marginTop="0.5rem" paddingLeft="0.5rem">Permission : {postData.permission} </Text>
              </Box>
            </GridItem>
            <GridItem
              colSpan={{ base: 12, lg: 3, md: 12, sm: 12 }}
              mt={{ base: 100, lg: 5 }}
            >
              <Center h={"100%"}>
                <Button colorScheme="blue" variant="solid">
                  Download File
                </Button>
              </Center>
            </GridItem>
            <GridItem colSpan={1}></GridItem>
            <GridItem colSpan={{ base: 12, lg: 6, md: 12, sm: 12 }} mt={5}>
              <Text fontSize={20}>Preview</Text>
              <SimpleGrid columns={3} spacing={4}>

                {/* <Box bg={"gray.300"} h={{ base: 150, lg: 220 }}></Box>
                <Box bg={"gray.300"} h={{ base: 150, lg: 220 }}></Box>
                <Box bg={"gray.300"} h={{ base: 150, lg: 220 }}></Box> */}

                {postData.image.map((item, index) => (
                  <Box key={`image-${index}`} height="13rem"
                    className={styles.previewImage}>
                    <img src={URL.createObjectURL(item)} />
                  </Box>
                ))}
              </SimpleGrid>
            </GridItem>
            <GridItem
              colSpan={{ base: 12, lg: 2, md: 12, sm: 12 }}
              alignSelf="flex-end"
              mt={5}
            >
              <Flex justify={"center"}>
                <Button w={"80%"} colorScheme="blue" variant="solid"
                  onClick={() => backPage()}>
                  Back
                </Button>
              </Flex>
              <Flex justify={"center"}>
                <Button w={"80%"} colorScheme="blue" variant="solid" mt={5} onClick={() => createPost()}>
                  <div id="finish-btn">Finish</div>
                </Button>
              </Flex>
            </GridItem>
          </Grid>
        </Center>
      </Stack>
    </>
  );
};

export default PreviewPost;
