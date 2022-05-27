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
  Image,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_POST_WITH_AUTHOR } from "../../graphql/post";
import styles from "../../styles/Forum.module.scss";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { VIEW_POST } from "../../graphql/me";
import { StarIcon } from "@chakra-ui/icons";
const Forum: NextPage = () => {
    const router = useRouter()
  const { loading, error, data } = useQuery(GET_ALL_POST_WITH_AUTHOR);
  const [view, {data: dataView, loading: loadingView, error: errorView}] = useMutation(VIEW_POST)
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
    view({ variables: { postId: id } });
    router.push(`/post/${id}`)
}
const renderRating = (rating: number) => {
  var starList: any[] = [];
  for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
          starList.push(
              <StarIcon color="white" ml={1} key={i}/>
          )
      } else {
          starList.push(
              <StarIcon color="black" ml={1} key={i}/>
          )
      }
  }
  return starList;
}
  return (
    <div>
      <Head>
        <title>All Post</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />ß
      </Head>
      <Box className={styles.container}>
      <HStack display={"flex"} justifyContent={"center"} marginBottom={10}>
            <Button onClick={() => prev()}>Prev</Button>
            <Text color={"white"}>{current}</Text>
            <Button onClick={() => next()}>Next</Button>
        </HStack>
        <Box display={"flex"} justifyContent={"center"} height={600}>
          <Grid templateColumns="repeat(4, 1fr)" gap={19}>
              {currentList.map((item : any, index : number) => (
                <GridItem key={index}>
                    <Button height={220} padding={5} paddingY={20} _hover={{transform: 'scale(1.03)'}} onClick={() => goNext(item._id)}>
                        <Box width={300} textAlign={"left"}>
                          <Box display={"flex"} justifyContent={"center"} marginBottom={5} height={100}>
                            <Image src={process.env.NEXT_PUBLIC_API_LINK+"/file/"+item.images[0]} alt='Dan Abramov' width={150} objectFit={"cover"} />
                          </Box>
                          <Box marginBottom={3}>
                            <hr/>
                          </Box>
                          <Box>
                            <Text overflow={"hidden"}>Title : {item.title}</Text>
                            <Text>Author : {item.author ? item.author.firstName + " " + item.author.lastName : 'None'} </Text>
                          </Box>
                          <HStack marginY={2}>
                            {renderRating(item.ratingAvg)} <Text fontSize={"small"}>({item.ratingAvg})</Text>
                          </HStack>
                        
                        </Box>
                        
                    </Button>
                </GridItem>
              ))} 
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default Forum;
