import type { NextPage } from "next";
import { useState } from "react";

import Head from 'next/head'
import Image from 'next/image'
import { SimpleGrid, Box, Grid, GridItem, Flex, Stack, useColorModeValue, Text } from '@chakra-ui/react'
import TaskProgress from '../../components/createpost/TaskProgress'
import UploadFile from '../../components/createpost/UploadFile'
import CreatePostForm from '../../components/createpost/CreatePostForm'
import PreviewPost from '../../components/createpost/PreviewPost'

import { Icon } from '@chakra-ui/react'
import { MdDescription, MdEdit, MdVerified } from 'react-icons/md';
import axios from 'axios'
import styles from '../../styles/CreatePost.module.scss'

import { CreatedPost } from '../../types/CreatedPost'

const tasks = [
  {
    taskName: "Upload File",
    icon: <Icon as={MdDescription} />
  },
  {
    taskName: "Fill Information",
    icon: <Icon as={MdEdit} />
  },
  {
    taskName: "Confirm",
    icon: <Icon as={MdVerified} />
  },
];

const CreatePost: NextPage = () => {

  const [taskState, setTaskState] = useState(1);
  const [postData, setPostData] = useState<CreatedPost>({
    title: "",
    description: "",
    contact: "",
    tag: [],
    permission: "",
    image: [],
    titleOcr:"",
    titleType:"1"
  });
  const [file, setFile] = useState<File | null>(null)
  const [document, setDocument] = useState({
    fileId: "",
    text: "",
    title: []
  })

  const renderComponent = () => {
    if (taskState == 1) {
      return (<UploadFile toNextPage={() => goToPreviewPage()} file={file} setFile={(file: File | null) => setFile(file)} />);
    }
    else if (taskState == 2) {
      return (<CreatePostForm postData={postData} document={document} toNextPage={(data: CreatedPost) => getDataFromForm(data)}
        backPage={() => backButtonHandler()} />);
    }
    else if (taskState == 3 && file != null) {
      return (<PreviewPost postData={postData} document={document} backPage={() => backButtonHandler()} file={file} />);
    }
  };

  const goToPreviewPage = async () => {
    console.log(file)
    const formData = new FormData()
    formData.append("file", file!)
    axios.defaults.headers.common["Authorization"] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyODkyNTg2MjY2OWU1ZjE1Mjc0ZjIyMyIsImlhdCI6MTY1MzE1NTIwNiwiZXhwIjoxNjUzNzYwMDA2fQ.DsrAnvsVTbgXUbVbpMRkX0gsqiD4-TlBuerVpNu4yBw`
    const result = await axios.post(`${process.env.NEXT_PUBLIC_API_LINK}/file/ocr`, formData)
    // const result = await axios.post(`${process.env.NEXT_PUBLIC_API_LINK}/auth/login`, loginPayload)
    console.log(result.data, "X")
    setDocument(result.data)
    setTaskState(2);
  }
  const getDataFromForm = (data: CreatedPost) => {
    setPostData(data);
    setTaskState(3);
  }

  const backButtonHandler = () => {
    if (taskState > 1) {
      setTaskState(taskState - 1);
    }
  }

  return (
    <>
      <Head>
        <title>Create Post</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Stack className={styles.container}>
        {/* Header & Progess Bar */}
        <Flex className={styles.createPostHeaderBox}>
          <Stack className={styles.createPostHeaderText}>
            <Text color={useColorModeValue("white", "white")} fontSize="2rem" id="create-post-title">
              Create Post
            </Text>
            <Text color={useColorModeValue("white", "white")} fontSize="1.3rem">
              สร้างโพสต์ใหม่
            </Text>
          </Stack>

          <TaskProgress tasks={tasks} state={taskState} />
        </Flex>

        {/* Page */}
        {renderComponent()}
      </Stack>
    </>
  );
};

export default CreatePost
