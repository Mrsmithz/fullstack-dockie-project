import { Grid, GridItem, Flex, Stack, Text, Image } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'

import styles from '../../styles/Home.module.scss'
import Link from "next/link";
import { useEffect, useState } from 'react';
type Props = {
  posts: any[]
}

const fontNormal = { base: '0.9rem', md: '1rem', lg: '1rem' }
const fontSm = { base: '0.7rem', md: '0.8rem', lg: '0.8rem' }

const NewestPostList = ({ posts }: Props) => {
  const [allPost, setAllPost] = useState<any[]>()
  useEffect(() => {
    // console.log(posts)
    let newPosts = [...posts]
    console.log(newPosts[0])
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

  return (
    <>
      {allPost?.map((item, index) => (
        <Link href={ `/post/${item._id}`} passHref key={item._id}>
          <Grid templateColumns='repeat(12, 1fr)' className={styles.newestPostBox}>

            <GridItem colSpan={2}>
              {/* <Flex justify="center" align="center" height="100%">
                <Image src={item.imgUrl} className={styles.newestPostImage} alt="image"/>
              </Flex> */}
            </GridItem>

            <GridItem colSpan={5} color={'black'}>
              <Flex align="center" height="100%">
                <Stack>
                  <Text fontSize={fontNormal}>{item.author}</Text>
                  <Text fontSize={fontNormal}>Title : {item.title}</Text>
                  <Text fontSize={fontSm}>Created Date : {new Date(item.createdAt).toString().slice(0, 24)}</Text>
                </Stack>
              </Flex>
            </GridItem>

            <GridItem colSpan={5}>
              <Flex justify="center" align="center" height="100%">
                <Stack w="100%">
                  {item.tags && (
                    <Flex flexWrap="wrap">
                      {item.tags.map((item: string, index: number) => (
                        <Flex justify="center" align="center" key={`newest-tag-${index}`}
                          className={styles.newestPostTagBox}
                          color={'black'}>
                          <span>{item}</span>
                        </Flex>
                      ))}
                    </Flex>
                  )}
                  {!!item.tags && (
                    <Flex flexWrap="wrap">
                      <Text>No Tags</Text>
                    </Flex>
                  )}


                  {/* <Stack direction="row" pl={1} mt={0}>
                    {renderRating(item.rating, index)}
                  </Stack> */}

                </Stack>
              </Flex>
            </GridItem>

          </Grid>
        </Link>

      ))}

    </>
  )
}

export default NewestPostList
