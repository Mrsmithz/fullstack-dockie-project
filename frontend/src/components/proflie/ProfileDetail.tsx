import { Center, Flex, Grid, GridItem, Text, useColorModeValue, Image, Button, Box } from "@chakra-ui/react";
import React, { useState } from "react";
import Link from "next/link"
const size = { base: "100%", md: "80%", lg: "60%" };
const ProfileDetail = () => {
    const backgroundProfileDetailColor = useColorModeValue("blue.100", "gray.500")
    const backgroundCollectoins = useColorModeValue("blue.300", "gray.700")
    return (
        <>
            <Center
                w={size}
                bg={backgroundProfileDetailColor}
                p={{ base: 5, lg: 6 }}
                borderRadius={20}
                alignSelf="center"
                mb={20}
            >
                <Grid templateColumns="repeat(12, 1fr)">
                    <GridItem colSpan={{base: 12, lg: 5}}>
                        <Center>
                            <Image
                                src="http://www.168virtualschool.com/images/No_image_available.png"
                                alt="image"
                                boxSize={{ base: 150, lg: 200, md: 400, sm: 400 }}
                            />
                        </Center>

                    </GridItem>
                    <GridItem colSpan={{base: 12, lg: 7}} mt={{base: 1, lg: 8}}>
                        <Center >
                            <Text fontSize={{base: 30, lg: 50}} >Name Lastname</Text>
                        </Center>
                        <Center>
                            <Text fontSize={20}>2 Post 20 Follower 20 Following</Text>
                        </Center>
                        <Center mt={5}>
                            <Button colorScheme="blue" variant="solid">+ Follow</Button>
                        </Center>
                    </GridItem>
                </Grid>
            </Center>
            <Box
                w={{base: "100%", lg: "70%"}}
                bg={backgroundProfileDetailColor}
                p={{ base: 5, lg: 8 }}
                borderRadius={20}
                alignSelf="center"
            >
                <Text fontSize={{base: 25, lg: 30}}>Collections</Text>
                <Grid templateColumns="repeat(12, 1fr)" gap={{base: 3, lg: 10}} mt={5}>
                    <GridItem colSpan={{base: 6, lg: 3}}>
                        <Link href={"/post/1"} passHref>
                            <Button bg={backgroundCollectoins} w={"100%"} h={{base: 200, lg: 300}} borderRadius={20}>
                                <Center>
                                    <Text fontSize={25}>Post 1</Text>
                                </Center>
                            </Button>
                        </Link>
                    </GridItem>
                </Grid>
            </Box>
        </>
    );
};

export default ProfileDetail;
