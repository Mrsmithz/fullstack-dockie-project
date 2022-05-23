import { Center, Flex, Grid, GridItem, Text, useColorModeValue, Image, Button, Box, useToast } from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import Link from "next/link"
import { Profile } from "../../types/Profile";
import { Post } from "../../types/Post";
const size = { base: "100%", md: "80%", lg: "60%" };


type Props = {
    profile: Profile,
}

const ProfileDetail = ({ profile }: Props) => {
    const toast = useToast()
    const backgroundProfileDetailColor = useColorModeValue("blue.100", "gray.500")
    const backgroundCollectoins = useColorModeValue("blue.300", "gray.700")
    const [followButton, setFollowButton] = useState(true)
    const followUser = useCallback(async (profile) => {
        toast({
            title: `Follow ${profile.firstName}`,
            status: 'success',
            duration: 4000,
            isClosable: true,
        })
    }, [])
    const unFollowUser = useCallback(() => {
        setFollowButton(true)
        toast({
            title: `Un follow ${profile.firstName}`,
            status: 'error',
            duration: 4000,
            isClosable: true,
        })
    }, [])
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
                    <GridItem colSpan={{ base: 12, lg: 5 }}>
                        <Center>
                            <Image
                                src={profile?.image}
                                alt="image"
                                boxSize={{ base: 150, lg: 200, md: 400, sm: 400 }}
                            />
                        </Center>

                    </GridItem>
                    <GridItem colSpan={{ base: 12, lg: 7 }} mt={{ base: 1, lg: 8 }}>
                        <Center >
                            <Text fontSize={{ base: 30, lg: 50 }} >{profile?.firstName} {profile?.lastName}</Text>
                        </Center>
                        <Center>
                            <Text fontSize={20}>{profile?.posts.length} Post {profile?.followings.length} Followings</Text>
                        </Center>
                        <Center mt={5}>
                            {followButton && (
                                <Button colorScheme="blue" variant="solid" onClick={() => followUser(profile)}>+ Follow</Button>
                            )}
                            {!followButton && (
                                <Button colorScheme="red" variant="solid" onClick={() => unFollowUser()}>Un follow</Button>
                            )}
                        </Center>
                    </GridItem>
                </Grid>
            </Center>
            <Box
                w={{ base: "100%", lg: "70%" }}
                bg={backgroundProfileDetailColor}
                p={{ base: 5, lg: 8 }}
                borderRadius={20}
                alignSelf="center"
            >
                <Text fontSize={{ base: 25, lg: 30 }}>Collections</Text>
                <Grid templateColumns="repeat(12, 1fr)" gap={{ base: 3, lg: 10 }} mt={5}>
                    {profile?.postsDetail.map((post: Post) => (
                        <GridItem colSpan={{ base: 6, lg: 3 }} key={post._id}>
                            <Link href={"/post/" + post._id} passHref>
                                <Button bg={backgroundCollectoins} w={"100%"} h={{ base: 200, lg: 300 }} borderRadius={20}>
                                    <Center>
                                        <Text fontSize={25}>{post.title}</Text>
                                    </Center>
                                </Button>
                            </Link>
                        </GridItem>
                    ))}
                </Grid>
            </Box>
        </>
    );
};

export default ProfileDetail;
