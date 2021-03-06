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
import { GET_ALL_POSTS, GET_NEWEST_POST } from "../graphql/post"
import { ME } from '../graphql/me'


const Home: NextPage = () => {
  const { loading, error, data } = useQuery(GET_ALL_POSTS)
  const { loading : loadingNewest, error : errorNewest, data : dataNewest, refetch : refetchNewest} = useQuery(GET_NEWEST_POST)
  const { loading: loadingMe, error: errorMe, data: dataMe, refetch} = useQuery(ME)
  const { data: token, status } = useSession()

  useEffect(() => {
    console.log("Refetch")
    refetch()
    refetchNewest()
  }, [])
  if(loading || loadingNewest || loadingMe){
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
                <RecommendedCarousel data={data?.posts} />
              </Box>

              {/* Bottom Carousel Component */}
              <Grid templateColumns='repeat(12, 1fr)'
                gap={6} width={{ base: '100%', sm: '90%', md: '90%', lg: '85%', xl: '70%' }}
              >

                {/* Newest Post Grid */}
                <GridItem colSpan={{ base: 12, md: 12, lg: 7 }}>

                  <h1 className={styles.homeHeader}>Newest Post</h1>
                  {!!dataNewest && (
                    <NewestPostList posts={dataNewest.newestPosts} />
                  )}


                </GridItem>

                {/* History Grid */}
                <GridItem colSpan={{ base: 12, md: 12, lg: 5 }}>
                  <h1 className={styles.homeHeader}>Recent View Post</h1>
                  {
                    dataMe.me != undefined && (
                      <HistoryPostList posts={dataMe?.me.recentViews} />
                    )
                  }
                </GridItem>

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
