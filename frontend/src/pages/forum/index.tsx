import { NextPage } from "next";
import Head from "next/head";
import {
  HStack,
  Stack,
  Button,
  ButtonGroup,
  Box,
  Text,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { GET_ALL_POST_WITH_AUTHOR } from "../../graphql/post";
import styles from "../../styles/Forum.module.scss";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
const Forum: NextPage = () => {
    const router = useRouter()
  const { loading, error, data } = useQuery(GET_ALL_POST_WITH_AUTHOR);
  const [current, setCurrent] = useState<number>(1);
  const [all, setAll] = useState<any[]>([])
  const [currentList, setCurrentList] = useState<any[]>([])
  useEffect(() => {
        if (!!data){
            init()
        }
  }, [data])
  const init = useCallback(() => {
        let newList = [...data.posts] as any[]
        setAll(newList)
        setCurrentList(newList.slice(0, 12))
  }, [data, setAll, setCurrentList])

  const next = () => {
    if (current == Math.ceil(all.length / 12)) return
    let list = all.slice((current)*12, (current+1) * 12)
    setCurrentList(list)
    setCurrent(current + 1);

  };
  const prev = () => {
    if (current == 1) return;
    let list = all.slice((current-2)*12, (current-1) * 12)
    setCurrentList(list)
    setCurrent(current - 1);
  };
  if (loading) {
    return <div>Loading</div>;
  }
  const goNext = (id: any) => {
    router.push(`/post/${id}`)
}
  return (
    <div>
      <Head>
        <title>All Post</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Box className={styles.container}>
        <Box display={"flex"} justifyContent={"center"} height={600}>
          <Grid templateColumns="repeat(4, 1fr)" gap={15}>
              {currentList.map((item : any, index : number) => (
                <GridItem key={index}>
                    <Button height={150} padding={5} paddingY={20} _hover={{transform: 'scale(1.03)'}} onClick={() => goNext(item._id)}>
                        <Box width={300} textAlign={"left"}>
                            <Text overflow={"hidden"}>Title : {item.title}</Text>
                            <Text>Author : {item.author ? item.author.firstName + " " + item.author.lastName : 'None'} </Text>
                            <Text>Created At : {new Date(item.createdAt).toString().slice(0, 24)}</Text>
                        </Box>
                        
                    </Button>
                </GridItem>
              ))} 
          </Grid>
        </Box>
          <HStack>
            <Button onClick={() => prev()}>Prev</Button>
            <Text color={"white"}>{current}</Text>
            <Button onClick={() => next()}>Next</Button>
          </HStack>
      </Box>
    </div>
  );
};

export default Forum;
