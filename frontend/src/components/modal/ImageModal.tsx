import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    Image
} from '@chakra-ui/react'

//Image Modal
const ImageModal: React.FC<{ imageSrc: string, isOpen: boolean, setOpen: Function }> = ({ imageSrc, isOpen, setOpen }) => {
    return (

        <Modal isOpen={isOpen} onClose={() => setOpen(false)} size={"4xl"} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton
                    bg={'#041C32'}
                    color={'snow'}
                    borderRadius={30}
                    _focus={{}}
                    _hover={{
                        backgroundColor:'#1f3a53'
                    }}
                    _active={{}}
                />
                <Image src={imageSrc} cursor={'default'} alt='Full Image' />
            </ModalContent>
        </Modal>

    )
};
export default ImageModal;