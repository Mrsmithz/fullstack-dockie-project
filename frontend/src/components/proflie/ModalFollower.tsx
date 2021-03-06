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
    Image,
    Grid,
    GridItem,
    Divider,
    Center
} from '@chakra-ui/react'
import { Follower } from "../../types/Follower"
import Link from "next/link"

type Props = {
    isOpen: boolean,
    onOpen: Function,
    onClose: Function,
    followers: Follower[]
}
const ModalFollower = ({ isOpen, onOpen, onClose, followers }: Props) => {
    return (
        <>
            <Modal isOpen={isOpen} onClose={() => onClose()}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Follower</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box h={400} overflowX="auto">
                            {followers.map((follower: Follower) => (
                                <Box key={follower.followerId}>
                                    <Grid templateColumns="repeat(12, 1fr)" mb={3}>
                                        <GridItem colStart={1} colEnd={2}>
                                            <Image src={follower.follower.image} borderRadius={30} />
                                        </GridItem>
                                        <GridItem colStart={3} colEnd={10}>
                                            <Text mt={1}>
                                                {follower.follower.firstName} {follower.follower.lastName}
                                            </Text>
                                        </GridItem>
                                    </Grid>
                                    <Divider mb={3} />
                                </Box>
                            ))}
                            {followers.length == 0 && (
                                <Center>
                                    <Text>No followers</Text>
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