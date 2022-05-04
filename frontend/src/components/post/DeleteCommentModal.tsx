import React from "react";
import {
    Text,
    Button,
    Modal,
    ModalOverlay,
    ModalHeader,
    ModalContent,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
} from "@chakra-ui/react";

type Props = {
    isOpen: boolean
    onClose: Function
    handleDeleteModal: Function
}

const RatingModal = ({ isOpen, onClose, handleDeleteModal }: Props) => {

    return (
        <Modal isOpen={isOpen} onClose={() => onClose()}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Are you sure?</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>Are you sure that you want delete this comment?</Text>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={() => handleDeleteModal()}>
                        Sure
                    </Button>
                    <Button variant='ghost' onClick={() => onClose()}>Exit</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default RatingModal;
