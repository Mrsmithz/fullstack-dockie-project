import { Grid, GridItem, Flex, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'

import styles from '../../styles/Home.module.scss'
import Link from "next/link";
type Props = {
  posts: any[]
}

const fontNormal = { base: '0.9rem', md: '1rem', lg: '1rem' }
const fontSm = { base: '0.7rem', md: '0.8rem', lg: '0.8rem' }

const NewestPostList = ({ posts }: Props) => {

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
      {posts.map((item, index) => (
        <Link href={ `/post/${index}`} passHref key={`newest-${index}`}>
          <Grid templateColumns='repeat(12, 1fr)' className={styles.newestPostBox}>

            <GridItem colSpan={2}>
              <Flex justify="center" align="center" height="100%">
                <img src={item.imgUrl} className={styles.newestPostImage} />
              </Flex>
            </GridItem>

            <GridItem colSpan={5} color={'black'}>
              <Flex align="center" height="100%">
                <Stack>
                  <Text fontSize={fontNormal}>{item.author}</Text>
                  <Text fontSize={fontNormal}>Title : {item.title}</Text>
                  <Text fontSize={fontSm}>Created Date : {item.createDate}</Text>
                </Stack>
              </Flex>
            </GridItem>

            <GridItem colSpan={5}>
              <Flex justify="center" align="center" height="100%">
                <Stack w="100%">

                  <Flex flexWrap="wrap">
                    {item.tag.map((item: string, index: number) => (
                      <Flex justify="center" align="center" key={`newest-tag-${index}`}
                        className={styles.newestPostTagBox}
                        color={'black'}>
                        <span>{item}</span>
                      </Flex>
                    ))}
                  </Flex>

                  <Stack direction="row" pl={1} mt={0}>
                    {renderRating(item.rating, index)}
                  </Stack>

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
