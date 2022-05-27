import type { NextPage } from 'next'
import React, { useEffect, useState } from "react"
import { useRouter } from 'next/router';
import {
    Box,
    Center,
    Heading,
    Text,
    Stack,
    HStack,
    Avatar,
    useColorModeValue,
    Button,
    useColorMode,
    Spinner,
    Flex,
    Tag,
    TagLabel,
    TagLeftIcon,
    TagRightIcon,
    TagCloseButton,
    Image
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons'
import styles from '../../styles/Home.module.scss'
import { useMutation } from '@apollo/client';
import { VIEW_POST } from '../../graphql/me';

type Props = {
    item:any
  }

const RecommendedCard = ({ item }:Props) => {
    const router = useRouter()
    const [view, {data: dataView, loading: loadinView, error: errorView}] = useMutation(VIEW_POST)
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
    const goNext = () => {
        view({ variables : {
            postId: item._id
        }})
        router.push(`/post/${item?._id}`)
    }
    return (
        <Button
            height={160}
            width={380}
            style={{
                whiteSpace: "normal",
                wordWrap: "break-word",
            }}
            boxShadow={`6px 7px 10px -4px ${useColorModeValue('rgb(0 0 0 / 0.2)', '#864879')}`}
            borderRadius={10}

            bg={useColorModeValue('#c4c4c4', '#726A95')}
            _hover={{
                transform: 'scale(1.03)'
            }}
            my={3}
            p={4}
            _active={{
                transform: 'scale(.98)',
                borderColor: '#bec3c9',
                boxShadow:
                    '1 1 1px 2px #F2DDC1, 0 1px 1px rgba(0, 0, 0, .15)',
            }}
            _focus={{
                boxShadow:
                    `0px 2px 20px ${useColorModeValue('#CAB8FF', '#AAAAAA')}, 0 10px 10px -10px ${useColorModeValue('#CAB8FF', '#AAAAAA')}`
            }}
            onClick={goNext}
        >
            <Box display={"flex"} alignItems={"center"} justifyContent={"center"} ml={3}>
                <HStack w={'100%'}>
                    <Image
                        width={"30%"} height={"30%"}
                        borderRadius="full"
                        src={
                            process.env.NEXT_PUBLIC_API_LINK + "/file/" + item.images[0]
                        }
                        alt="Dan Abramov"
                    />
                    <Box textAlign={'left'} pt={2} pl={2}>
                        {/* <Text fontSize={18} >{item.author}</Text> */}
                        <Text marginBottom={2} fontSize={18} >Title : {item.title}</Text>
                        <HStack>
                            {renderRating(item.ratingAvg)}
                            <Text fontSize={"small"}>({item.ratingAvg})</Text>
                        </HStack>
                        
                    </Box>

                </HStack>
            </Box>
        </Button>
    )
}

export default RecommendedCard