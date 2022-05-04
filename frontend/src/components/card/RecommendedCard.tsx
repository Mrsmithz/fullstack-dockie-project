import type { NextPage } from 'next'
import React, { useEffect, useState } from "react"
import Image from 'next/image';
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
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons'
import styles from '../../styles/Home.module.scss'


const RecommendedCard: NextPage<{ item: any }> = ({ item }) => {
    const router = useRouter()
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
        router.push(`/post/${item?._id}`)
    }
    return (
        <Button
            height={220}
            width={380}
            // minWidth={400}
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
            <Box w={'100%'} h={'100%'} ml={3}>
                <HStack w={'100%'}>

                    {/* <Image src={item.imgUrl} alt={'logo'} width={50} height={50} /> */}

                    <Box textAlign={'left'} pt={2} pl={2}>
                        {/* <Text fontSize={18} >{item.author}</Text> */}
                        <Text fontSize={18} >Title : {item.title}</Text>
                    </Box>

                </HStack>
                <Text textAlign={'left'} mt={3} noOfLines={3} color={useColorModeValue('#8A8383', 'gray.200')} fontSize={14}>{item?.document.text}</Text>
                <Flex mt={4}>
                    {/* {item.tag.map((item: string, index: number) => (
                        <Tag size='md' bg={'#7C9473'} color={'snow'} borderRadius='full' key={index} ml={1} maxWidth={'30%'} px={2}>
                            <TagLabel textAlign={'center'} mt={1}>{item}</TagLabel>
                        </Tag>
                    ))} */}
                </Flex>
                {/* <Box w={'100%'} mt={3} textAlign={'left'}>
                    {renderRating(item.rating)}
                </Box> */}
            </Box>
        </Button>
    )
}

export default RecommendedCard