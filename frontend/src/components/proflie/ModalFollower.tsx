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
} from '@chakra-ui/react'
import { Follower } from "../../types/Follower"

type Props = {
    isOpen: boolean,
    onOpen: Function,
    onClose: Function,
    followers: Follower[]
}
const ModalFollower = ({ isOpen, onOpen, onClose, followers } : Props) => {
    return (
        <>
            <Modal isOpen={isOpen} onClose={() => onClose()}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Follower</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {followers.map((follower: any) => (
                            <Text key={follower.followerId}>{follower.follower.firstName}</Text>
                        ))}
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => onClose()}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>)
}

export default ModalFollower