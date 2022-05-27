import {
    Center, Grid, GridItem, Text, useColorModeValue, Image, Button, Box, useToast, useDisclosure
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link"
import { Profile } from "../../types/Profile";
import { Post } from "../../types/Post";
import { useMutation, gql } from '@apollo/client'
import ModalFollower from "./ModalFollower";
import ModalFollowing from "./ModalFollowing"
import axios from "axios"
const size = { base: "100%", md: "80%", lg: "60%" };

type Props = {
    profile: Profile,
    refetch: Function,
    session: any
}

const FOLLOW_USER_MUTATION = gql`
mutation($followingId: MongoID!){
    follow(followingId: $followingId){
      followingId
    }
  }
`
const UNFOLLOW_USER_MUTATION = gql`
mutation($followingId: MongoID!){
    unfollow(followingId: $followingId){
      createdAt
    }
}
`

const ProfileDetail = ({ profile, refetch, session }: Props) => {
    const toast = useToast()
    const backgroundProfileDetailColor = useColorModeValue("blue.100", "gray.500")
    const backgroundCollectoins = useColorModeValue("blue.300", "gray.700")
    const [followMutation] = useMutation(FOLLOW_USER_MUTATION)
    const [unfollowMutation] = useMutation(UNFOLLOW_USER_MUTATION)
    const [followButton, setFollowButton] = useState(true)
    const [renderFollowButton, setRenderFollowButton] = useState(false)
    const [myProfile, setMyProfile] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { 
        isOpen: isOpenFollowing,
        onOpen: onOpenFollowing,
        onClose: onCloseFollowing
    } = useDisclosure()
    const followUser = useCallback(async () => {
        setFollowButton(false)
        await followMutation({ variables: { followingId: profile?._id } })
        toast({
            title: `Follow ${profile?.firstName}`,
            status: 'success',
            duration: 4000,
            isClosable: true,
        })
        refetch()
    }, [])
    const unFollowUser = useCallback(async () => {
        setFollowButton(true)
        await unfollowMutation({ variables: { followingId: profile?._id } })
        toast({
            title: `Unfollow ${profile?.firstName}`,
            status: 'error',
            duration: 4000,
            isClosable: true,
        })
        refetch()
    }, [])

    const checkProfile = useCallback(async () => {
        const userId = await axios.get(`${process.env.NEXT_PUBLIC_API_LINK}/me`, {headers:{
            Authorization: `Bearer ${session?.accessToken}`
        }})
        if (profile?._id == userId.data._id) {
            setMyProfile(true)
        } else {
            setMyProfile(false)
        }
        const checkFollowing = profile?.followers.some(
            (follower) => follower.followerId == userId.data._id
        );
        if (checkFollowing) {
            setFollowButton(false)
        } else {
            setFollowButton(true)
        }
        setRenderFollowButton(true)
    }, [profile, setFollowButton, setRenderFollowButton, setMyProfile])

    useEffect(() => {
        checkProfile()
    }, [checkProfile])
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
                                borderRadius={200}
                            />
                        </Center>

                    </GridItem>
                    <GridItem colSpan={{ base: 12, lg: 7 }} mt={{ base: 1, lg: 8 }}>
                        <Center >
                            <Text fontSize={{ base: 30, lg: 40 }} > {profile?.firstName} {profile?.lastName}</Text>
                        </Center>
                        <Center>
                            <Button onClick={() => onOpen()}>{profile?.followers.length} Follower</Button>
                            <Button onClick={() => onOpenFollowing()} ml={10}>{profile?.followings.length} Following</Button>
                        </Center>
                        <Center mt={5}>
                            {renderFollowButton && followButton && myProfile == false && (
                                <Button colorScheme="blue" variant="solid" onClick={followUser}>+ Follow</Button>
                            )}
                            {renderFollowButton && !followButton && myProfile == false && (
                                <Button colorScheme="red" variant="solid" onClick={unFollowUser}>Un follow</Button>
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
                <Text fontSize={{ base: 25, lg: 30 }}>Post ( {profile?.posts.length} )</Text>
                <Grid templateColumns="repeat(12, 1fr)" gap={{ base: 3, lg: 5 }} mt={5}>
                    {profile?.posts.map((post: Post) => (
                        <GridItem colSpan={{ base: 6, lg: 3 }} key={post._id}>
                            <Link href={"/post/" + post._id} passHref>
                                <Button bg={backgroundCollectoins} w={"100%"} h={{ base: 200, lg: 200 }} borderRadius={20} style={{
                                    whiteSpace: "normal",
                                    wordWrap: "-moz-initial",
                                }}>
                                    <Center>
                                        <Text fontSize={15}>{post.title}</Text>
                                    </Center>
                                </Button>
                            </Link>
                        </GridItem>
                    ))}
                    {profile?.posts.length == 0 && (
                        <GridItem colSpan={12}>
                            <Center h={200}><Text fontSize={40}>No post.</Text></Center>
                        </GridItem>
                    )}
                </Grid>
            </Box>
            <ModalFollower isOpen={isOpen} onOpen={onOpen} onClose={onClose} followers={profile.followers}></ModalFollower>
            <ModalFollowing isOpen={isOpenFollowing} onOpen={onOpenFollowing} onClose={onCloseFollowing} followings={profile.followings}></ModalFollowing>
        </>
    );
};

export default ProfileDetail;
