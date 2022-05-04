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
    newRating: number
    handleRatingModal: Function
}

const RatingModal = ({ isOpen, onClose, newRating, handleRatingModal }: Props) => {

    return (
        <Modal isOpen={isOpen} onClose={() => onClose()}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Are you sure?</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>Are you sure that you want to rate this post {newRating} star?</Text>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={() => handleRatingModal()}>
                        Sure
                        </Button>
                    <Button variant='ghost' onClick={() => onClose()}>Exit</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default RatingModal;
