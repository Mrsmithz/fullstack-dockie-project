import {
  Grid,
  GridItem,
  Flex,
  Stack,
  Text,
  Image,
  Button,
  Divider,
  HStack,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

import styles from "../../styles/Home.module.scss";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { VIEW_POST } from "../../graphql/me";
type Props = {
  posts: any[];
};

const fontNormal = { base: "0.9rem", md: "1rem", lg: "1rem" };
const fontLarge = { base: "1.1rem", md: "1.2rem", lg: "1.2rem" };
const fontSm = { base: "0.7rem", md: "0.8rem", lg: "0.8rem" };

const NewestPostList = ({ posts }: Props) => {
  const [allPost, setAllPost] = useState<any[]>();
  const [view, { data: dataView, loading: loadingError, error: errorLoading }] =
    useMutation(VIEW_POST);
  const router = useRouter();
  useEffect(() => {
    let newPosts = [...posts];
    setAllPost(
      newPosts
        .sort(
          (a: any, b: any) =>
            new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
        )
        .slice(0, 4)
    );
  }, []);
  const goNext = (id: any) => {
    view({
      variables: {
        postId: id,
      },
    });
    router.push(`/post/${id}`);
  };
  const renderRating = (rating: number) => {
    var starList: any[] = [];
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            starList.push(
                <StarIcon color="white" ml={2} key={i}/>
            )
        } else {
            starList.push(
                <StarIcon color="black" ml={2} key={i}/>
            )
        }
    }
    return starList;
}
  return (
    <>
      {allPost?.map((item, index) => (
        <Button
          onClick={() => goNext(item._id)}
          key={item._id}
          width={"100%"}
          height={"25%"}
          marginY={3}
        >
          <Grid templateColumns="repeat(12, 1fr)">
            <GridItem colSpan={3} display="flex" alignItems={"center"}>
              <Flex justifyContent="center" alignItems="center">
                <Image
                  borderRadius="full"
                  src={
                    process.env.NEXT_PUBLIC_API_LINK + "/file/" + item.images[0]
                  }
                  alt="Dan Abramov"
                />
              </Flex>
            </GridItem>
            <GridItem colStart={5}>
              <Flex justifyContent={"center"}>
                <Stack>
                  <Text textAlign={"left"} fontSize={fontNormal}>
                    Author :{" "}
                    {item.author.firstName + " " + item.author.lastName}
                  </Text>
                  <Text
                    overflow={"hidden"}
                    textAlign={"left"}
                    fontSize={fontLarge}
                  >
                    Title : {item.title}
                  </Text>
                  <Text textAlign={"left"} fontSize={fontSm}>
                    Created Date :{" "}
                    {new Date(item.createdAt).toString().slice(0, 24)}
                  </Text>
                  <HStack>
                    <Text>Rating :</Text>{renderRating(item.ratingAvg)} <Text fontSize={"small"}>({item.ratingAvg})</Text>
                  </HStack>
                </Stack>
              </Flex>
            </GridItem>
          </Grid>
        </Button>
      ))}
    </>
  );
};

export default NewestPostList;
