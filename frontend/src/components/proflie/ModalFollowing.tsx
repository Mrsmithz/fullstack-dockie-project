import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text
} from '@chakra-ui/react'
import { Following } from '../../types/Following'

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
                        {followings.map((following: Following) => (
                            <Text>{following.following.firstName}</Text>
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