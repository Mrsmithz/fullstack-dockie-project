import { Grid, GridItem, Flex, Stack, Text, Image, Button } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'

import styles from '../../styles/Home.module.scss'
import Link from "next/link";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { VIEW_POST } from '../../graphql/me';
type Props = {
  posts: any[]
}

const fontNormal = { base: '0.9rem', md: '1rem', lg: '1rem' }
const fontLarge = {base: '1.1rem', md: '1.2rem', lg: '1.2rem'}
const fontSm = { base: '0.7rem', md: '0.8rem', lg: '0.8rem' }

const NewestPostList = ({ posts }: Props) => {
  const [allPost, setAllPost] = useState<any[]>()
  const [view, {data: dataView, loading: loadingError, error: errorLoading}] = useMutation(VIEW_POST)
  const router = useRouter()
  useEffect(() => {
    let newPosts = [...posts]
    setAllPost(newPosts.sort((a: any,b: any) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()).slice(0,4))
  }, [])
  const renderRating = (rating: number, index: number) => {
    var starList: any[] = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        starList.push(
          <StarIcon color="white" key={`newest-${index}-${i}`} />
        )
      } else {
        starList.push(
          <StarIcon color="black" key={`newest-${index}-${i}`} />
        )
      }
    }
    return starList;
  }

  const goNext = (id : any) => {
    view({variables: {
      postId: id
    }})
    router.push(`/post/${id}`)
  }
  return (
    <>
      {allPost?.map((item, index) => (
        <Button onClick={() => goNext(item._id)} key={item._id} width={"100%"} height={"25%"} marginY={5}>
          <Grid templateColumns='repeat(12, 1fr)' >

            {/* <GridItem colSpan={2}>
              <Flex justify="center" align="center" height="100%">
                <Image src={item.imgUrl} className={styles.newestPostImage} alt="image"/>
              </Flex>
            </GridItem> */}

            <GridItem>
              <Flex justifyContent={"center"}>
                <Stack>
                  <Text textAlign={"left"} fontSize={fontNormal}>Author : {item.author.firstName + " " + item.author.lastName}</Text>
                  <Text overflow={"hidden"} textAlign={"left"} fontSize={fontLarge}>Title : {item.title}</Text>
                  <Text textAlign={"left"} fontSize={fontSm}>Created Date : {new Date(item.createdAt).toString().slice(0, 24)}</Text>
                </Stack>
              </Flex>
            </GridItem>
          </Grid>
        </Button>

      ))}

    </>
  )
}

export default NewestPostList
