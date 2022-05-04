import React from "react";
import { IconButton, Box } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import Link from "next/link";

type Props = {};

const Fab = () => {
  return (
    <>
      <Box
        style={{
          position: "fixed",
          bottom: 50,
          right: 30,
        }}
      >
        <Link href="/createpost" passHref>
          <IconButton
            id="create-btn"
            borderRadius={200}
            colorScheme="blue"
            aria-label="Call Segun"
            size={"lg"}
            icon={<AddIcon />}
          />
        </Link>
      </Box>
    </>
  );
};

export default Fab;
