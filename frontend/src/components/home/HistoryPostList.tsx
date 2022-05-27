import { useMutation } from "@apollo/client";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Divider, Grid, GridItem, IconButton, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { VIEW_POST } from "../../graphql/me";
import styles from "../../styles/Home.module.scss";

type Props = {
  posts: any[];
};
type HistoryItem = {
  historyItem: history;
};
type history = {
  post: any
};

const fontNormal = { base: "0.9rem", md: "1rem", lg: "1rem" };

const paddingX = { base: 0, md: 4, lg: 6 };

const History = ({ posts }: Props) => {
  const router = useRouter()
  const [view, {data: dataView, loading: loadingError, error: errorLoading}] = useMutation(VIEW_POST)
  const goNext = (id :any) => {
    view({variables : {
      postId: id
    }})
    router.push(`/post/${id}`)
  }
  const HistoryItem = ({ historyItem }: HistoryItem) => {
    return (
      <Stack px={3}>
        <Grid templateColumns="repeat(6, 1fr)" gap={3} px={paddingX} color={useColorModeValue('#FFFFFF', '#FFFFFF')}>
          <GridItem colSpan={5} h="10" style={{ display: "flex", alignItems: "flex-end"}}>
            <Text overflow={"hidden"} fontSize={fontNormal}>{historyItem.post.title}</Text>
          </GridItem>
          <GridItem
            colStart={6}
            colEnd={7}
            h="10"
            style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end" }}
          >
            <IconButton onClick={() => goNext(historyItem.post._id)} style={{marginLeft : 20}} aria-label="Icon" variant='outline' fontSize='20px' icon={<HamburgerIcon />}/>
            {" "}
          </GridItem>
        </Grid>
        <Divider orientation='horizontal' />
      </Stack>
    );
  };

  return (
    <Stack className={styles.historyPostBox}>
      {posts.map((item, index) => (
        <HistoryItem historyItem={item} key={item.id} />
      ))}
    </Stack>
  );
};
export default History;
