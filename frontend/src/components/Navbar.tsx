import { ReactNode, useState } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Center,
  useColorMode,
  Portal,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { MoonIcon, SunIcon, BellIcon } from "@chakra-ui/icons";
import NextLink from "next/link";

const NavLink = ({ children, page }: { children: ReactNode; page: string }) => (
  <NextLink href={page} passHref>
    <Link
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
    >
      {children}
    </Link>
  </NextLink>
);

export default function Simple() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: openModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();

  const backgroundNav = useColorModeValue("gray.100", "gray.900");
  const iconSwithTheme = useColorModeValue("yellow.300", "orange.500");
  const notiHover = useColorModeValue("blue.100", "blue.500");

  return (
    <>
      <Box
        bg={backgroundNav}
        px={4}
        position="fixed"
        width={"100%"}
        zIndex={100}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={10} alignItems={"center"}>
            <Box ml={5}>
              <Text fontSize="3xl">Dockie</Text>
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              <NavLink page={"/"}>Home</NavLink>
              <NavLink page={"/forum"}>Forum</NavLink>
              <NavLink page={"/ranking"}>Ranking</NavLink>
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Stack
              spacing={2}
              direction={"row"}
              display={{ base: "none", md: "flex" }}
            >
              <Menu>
                <MenuButton
                  onClick={toggleColorMode}
                  _hover={{ bg: iconSwithTheme }}
                  w={10}
                  borderRadius={100}
                >
                  {colorMode === "light" ? (
                    <MoonIcon w={5} h={10} />
                  ) : (
                    <SunIcon w={5} h={10} />
                  )}
                </MenuButton>
              </Menu>
              <Menu>
                <MenuButton
                  _hover={{ bg: notiHover }}
                  w={10}
                  borderRadius={100}
                >
                  <BellIcon w={5} h={10} />
                </MenuButton>
                <Portal>
                  <MenuList>
                    <MenuItem>Noti 1</MenuItem>
                    <MenuItem>Noti 2</MenuItem>
                    <MenuItem>Noti 3</MenuItem>
                    <MenuItem>Noti 4</MenuItem>
                    <MenuItem>Noti 5</MenuItem>
                  </MenuList>
                </Portal>
              </Menu>
            </Stack>
            <Box ml={5}>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={"https://avatars.dicebear.com/api/male/username.svg"}
                  />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>Username</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>Your Servers</MenuItem>
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </Flex>
        </Flex>

        {/* Mobile */}
        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4} alignItems="center">
              <NavLink page={"/"}>Home</NavLink>
              <NavLink page={"/forum"}>Forum</NavLink>
              <NavLink page={"/ranking"}>Ranking</NavLink>
              <Box onClick={toggleColorMode}>
                {colorMode === "light" ? (
                  <Text>Dark Mode</Text>
                ) : (
                  <Text>Light Mode</Text>
                )}
              </Box>
              <Box onClick={onOpenModal}>Notification</Box>
            </Stack>
          </Box>
        ) : null}

        {/* Modal Noti */}
        <Modal isOpen={openModal} onClose={onCloseModal} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton onClick={onCloseModal} />
            <ModalBody>
              <Box>Noti 1</Box>
              <Box>Noti 2</Box>
              <Box>Noti 3</Box>
              <Box>Noti 4</Box>
              <Box>Noti 5</Box>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onCloseModal}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
}