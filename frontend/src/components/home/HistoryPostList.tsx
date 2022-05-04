import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Divider, Grid, GridItem, IconButton, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import styles from "../../styles/Home.module.scss";

type Props = {
  posts: any[];
};
type HistoryItem = {
  historyItem: history;
};
type history = {
  id: string;
  title: string;
  duration: string;
};

const fontNormal = { base: "0.9rem", md: "1rem", lg: "1rem" };

const paddingX = { base: 0, md: 4, lg: 6 };

const History = ({ posts }: Props) => {
  const HistoryItem = ({ historyItem }: HistoryItem) => {
    return (
      <Stack px={3}>
        <Grid templateColumns="repeat(6, 1fr)" gap={3} px={paddingX} color={useColorModeValue('#FFFFFF', '#FFFFFF')}>
          <GridItem colSpan={3} h="10" style={{ display: "flex", alignItems: "flex-end", cursor: "pointer"}}>
            <Text fontSize={fontNormal}>{historyItem.title}</Text>
          </GridItem>
          <GridItem
            colStart={4}
            colEnd={7}
            h="10"
            style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end" }}
          >
            <Text fontSize={fontNormal}>{historyItem.duration} ago</Text>{" "}
            <IconButton style={{marginLeft : 20}} aria-label="Icon" variant='outline' fontSize='20px' icon={<HamburgerIcon />}/>
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
