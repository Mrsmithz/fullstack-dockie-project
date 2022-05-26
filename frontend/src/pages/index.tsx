import type { NextPage } from 'next'

import Head from 'next/head'
import Image from 'next/image'
import { SimpleGrid, Box, Grid, GridItem, Flex, Center, Text, Button } from '@chakra-ui/react'
import NewestPostList from '../components/home/NewestPostList'
import RecommendedCarousel from '../components/carousel/RecommendedCarousel'

import styles from '../styles/Home.module.scss'
import HistoryPostList from '../components/home/HistoryPostList'
import Fab from '../components/createpost/Fab'
import { gql, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { GoogleLogin } from 'react-google-login';
import { BsPeopleFill } from 'react-icons/bs'
import { MdFeaturedPlayList, MdLiveHelp } from 'react-icons/md'
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { useSession, getSession, signIn, signOut } from "next-auth/react"
import { GET_ALL_POSTS } from "../graphql/post"

const newestPostData = [
  {
    _id: "1akfjaksd",
    title: "Newest Post 1",
    author: "Name Lastname",
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
    rating: 4
  },
  {
    _id: "2sdflosdf",
    title: "Newest Post 2",
    author: "Name Lastname",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley",
    createDate: "09/02/2565",
    imgUrl: "http://www.168virtualschool.com/images/No_image_available.png",
    tag: [
      "Tag1wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
      "Tag2",
      "Tag3",
      "Tag4",
      "Tag5",
    ],
    rating: 3
  },
  {
    _id: "3kdjfklgdfkg",
    title: "Newest Post 3",
    author: "Name Lastname",
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
    rating: 5
  },
  {
    _id: "4dvdljflkdsjfksl",
    title: "Newest Post 3",
    author: "Name Lastname",
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
    rating: 5
  },
]


const historyPostData = [
  {
    id: "history1",
    title: "History Post 1",
    duration: "1m"
  },
  {
    id: "history2",
    title: "History Post 2",
    duration: "2m"
  },
  {
    id: "history3",
    title: "History Post 3",
    duration: "3m"
  },
  {
    id: "history4",
    title: "History Post 4",
    duration: "4m"
  }
]

const Home: NextPage = () => {
  // console.log(posts, "xxx")
  const { loading, error, data } = useQuery(GET_ALL_POSTS)

  const { data: token, status } = useSession()
  // console.log(token, "c")
  // const [ session, loadingsss ] = useSession()
  // console.log(data, token, "x")
  // console.log(session, "dd")
  // useEffect(() => {
  //   console.log(data, "d")
  // }, [token])
  const responseGoogle = (response: any) => {
    console.log(response);
  }

  if(loading){
    return <p>Loading...</p>
  }

  if (status === "loading") {
    return <p>Loading...</p>
  }

  return (
    <Box className={styles.container}>
      {
        token ?
          <>
            <Head>
              <title id="home">Home</title>
              <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <>

              <Box width={{ base: '100%', sm: '90%', md: '90%', lg: '90%', xl: '75%' }}>
                <RecommendedCarousel data={data?.posts}></RecommendedCarousel>
              </Box>

              {/* Bottom Carousel Component */}
              <Grid templateColumns='repeat(12, 1fr)'
                gap={6} width={{ base: '100%', sm: '90%', md: '90%', lg: '85%', xl: '70%' }}
              >

                {/* Newest Post Grid */}
                <GridItem colSpan={{ base: 12, md: 12, lg: 7 }}>

                  <h1 className={styles.homeHeader}>Newest Post</h1>

                  <NewestPostList posts={newestPostData} />

                </GridItem>

                {/* History Grid */}
                <GridItem colSpan={{ base: 12, md: 12, lg: 5 }}>
                  <h1 className={styles.homeHeader}>History Post</h1>

                  <HistoryPostList posts={historyPostData} />
                </GridItem>

              </Grid>
              <Fab></Fab>
            </>
          </>
          :
          <Center height={'100%'} width={'100%'} flexDirection={'column'} padding={3}>
            <Center marginTop={4}>
              <Text as='h2' fontSize={'2xl'}>Dockie</Text>
            </Center>
            {/* <Center marginTop={4}>
              <Text as='h2' fontSize={'2xl'} isTruncated>Online Structural Validate-based System © v1.0 beta</Text>
            </Center> */}
            <Center marginTop={8}>
              <Button colorScheme='green' variant='outline' size={'lg'} onClick={() => signIn('google')}>
                Login with google
              </Button>
              {/* <GoogleLogin
                clientId="1078651650648-j2u0h98ugt94ogmetd0gjv4lplhn35kq.apps.googleusercontent.com"
                buttonText="Login with google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
              /> */}
            </Center>
          </Center>
      }

    </Box>
  )
}

// export async function getServerSideProps(context) {
//   let result = await GetPosts()
//   return {
//     props: {
//       session: await getSession(context),
//       posts: result
//     },
//   }
// }
// function GetPosts() {
//   const { loading, error, data } = useQuery(GET_ALL_POSTS)
//   return { loading, error, data }
//   // ...
// }
export default Home
