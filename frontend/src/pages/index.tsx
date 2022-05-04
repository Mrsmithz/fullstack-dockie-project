import type { NextPage } from 'next'

import Head from 'next/head'
import Image from 'next/image'
import { SimpleGrid, Box, Grid, GridItem } from '@chakra-ui/react'
import NewestPostList from '../components/home/NewestPostList'
import RecommendedCarousel from '../components/carousel/RecommendedCarousel'

import styles from '../styles/Home.module.scss'
import HistoryPostList from '../components/home/HistoryPostList'
import Fab from '../components/createpost/Fab'
import { gql, useQuery } from '@apollo/client'
import { useEffect } from 'react'
const newestPostData = [
  {
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
    title : "History Post 1",
    duration : "1m"
  },
  {
    id: "history2",
    title : "History Post 2",
    duration : "2m"
  },
  {
    id: "history3",
    title : "History Post 3",
    duration : "3m"
  },
  {
    id: "history4",
    title : "History Post 4",
    duration : "4m"
  }
]

const GET_ALL_POSTS = gql`
  query Post{
    posts{
      _id,
      title,
      document,
      status
    }
  }
`
const Home: NextPage = () => {
  const { loading, error, data} = useQuery(GET_ALL_POSTS)

  useEffect(() => {
    console.log(data)
  }, [data])
  return (
    <>

      <Head>
        <title id="home">Home</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Box className={styles.container} >

        <Box  width={{ base: '100%', sm: '90%', md: '90%', lg: '90%', xl: '75%' }}>
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

            <HistoryPostList posts={historyPostData}/>
          </GridItem>

        </Grid>
        <Fab></Fab>
      </Box>
    </>
  )
}

export default Home
