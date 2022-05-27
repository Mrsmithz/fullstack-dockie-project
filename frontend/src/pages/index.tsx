import type { NextPage } from 'next'

import Head from 'next/head'
import { SimpleGrid, Box, Grid, GridItem, Flex, Center, Text, Button, Image } from '@chakra-ui/react'
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
import { GET_ALL_POSTS, GET_ALL_POST_FOR_FILTER } from "../graphql/post"
import { ME } from '../graphql/me'

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
  const [filter, setFilter] = useState<any[]>([])
  const { loading, error, data } = useQuery(GET_ALL_POSTS)
  const { loading: loadingFilter, error: errorFilter, data: dataFilter} = useQuery(GET_ALL_POST_FOR_FILTER)
  const { loading: loadingMe, error: errorMe, data: dataMe} = useQuery(ME)
  const { data: token, status } = useSession()
  console.log(token, "c")
  // const [ session, loadingsss ] = useSession()
  // console.log(data, token, "x")
  // console.log(session, "dd")
  // useEffect(() => {
  //   console.log(data, "d")
  // }, [token])
  const responseGoogle = (response: any) => {
    console.log(response);
  }

  if(loading || loadingFilter){
    return <p>Loading...</p>
  }

  if (status === "loading") {
    return <p>Loading...</p>
  }
  if (dataMe) {
    console.log(dataMe)
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
                <RecommendedCarousel data={data?.posts} />
              </Box>

              {/* Bottom Carousel Component */}
              <Grid templateColumns='repeat(12, 1fr)'
                gap={6} width={{ base: '100%', sm: '90%', md: '90%', lg: '85%', xl: '70%' }}
              >

                {/* Newest Post Grid */}
                <GridItem colSpan={{ base: 12, md: 12, lg: 7 }}>

                  <h1 className={styles.homeHeader}>Newest Post</h1>

                  <NewestPostList posts={dataFilter?.posts} />

                </GridItem>

                {/* History Grid
                <GridItem colSpan={{ base: 12, md: 12, lg: 5 }}>
                  <h1 className={styles.homeHeader}>History Post</h1>
                  {
                    !!dataMe.me.recentView && (
                      <Text>No Recent Post</Text>
                    )
                  }
                  {
                    !dataMe.me.recentView && (
                      <HistoryPostList posts={dataMe.me.recentView} />
                      
                    )
                  }
                </GridItem> */}

              </Grid>
              <Fab></Fab>
            </>
          </>
          :
          <Center height={'100%'} width={'100%'} flexDirection={'column'} padding={3}>
            <Center marginTop={4}>
              <Text as='h2' fontSize={'150'} color={"whiteAlpha.700"}>Dockie</Text>
            </Center>
            <Center marginTop={8}>
              <Button width={"100%"} height={"100%"} padding={5} colorScheme='green' variant='outline' size={'lg'} onClick={() => signIn('google')}>
                <Image src={"https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/64px-Google_%22G%22_Logo.svg.png"} />
              </Button>
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
