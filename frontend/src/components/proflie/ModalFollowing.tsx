import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text,
    Box,
    Grid,
    GridItem,
    Divider,
    Image,
    Center
} from '@chakra-ui/react'
import { Following } from '../../types/Following'
import Link from "next/link"

type Props = {
    isOpen: boolean,
    onOpen: Function,
    onClose: Function,
    followings: Following[]
}
const ModalFollower = ({ isOpen, onOpen, onClose, followings }: Props) => {
    return (
        <>
            <Modal isOpen={isOpen} onClose={() => onClose()}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Following</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box h={400} overflowX="auto">
                            {followings.map((following: Following) => (
                                <Box key={following.followingId}>
                                    <Grid templateColumns="repeat(12, 1fr)" mb={3}>
                                        <GridItem colStart={1} colEnd={2}>
                                            <Image src={following.following.image} borderRadius={30} />
                                        </GridItem>
                                        <GridItem colStart={3} colEnd={10}>
                                            <Text mt={1}>
                                                {following.following.firstName} {following.following.lastName}
                                            </Text>
                                        </GridItem>
                                    </Grid>
                                    <Divider mb={3} />
                                </Box>
                            ))}
                            {followings.length == 0 && (
                                <Center>
                                    <Text>No followings</Text>
                                </Center>
                            )}
                        </Box>
                    </ModalBody>

                    <ModalFooter>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>)
}

export default ModalFollower