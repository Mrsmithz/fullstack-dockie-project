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
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client'

const ME_QUERY = gql`
query{
    me{
      _id
      firstName
      lastName
      image
    }
  }
`

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
  const router = useRouter()
  const { data: token, status } = useSession()
  const { loading, error, data } = useQuery(ME_QUERY)

  const backgroundNav = useColorModeValue("gray.100", "gray.900");
  const iconSwithTheme = useColorModeValue("yellow.300", "orange.500");

  const goProfilePage = (id: string) => {
    router.push("/profile/" + id)
  }
  const handleSignout = async () => {
    await signOut({ callbackUrl: "/" })
  }
  if (!token) {
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
              </Stack>
            </Flex>
          </Flex>

          {/* Mobile */}
          {isOpen ? (
            <Box pb={4} display={{ md: "none" }}>
              <Stack as={"nav"} spacing={4} alignItems="center">
                <NavLink page={"/"}>Home</NavLink>
                <NavLink page={"/forum"}>Forum</NavLink>
                <Box onClick={toggleColorMode}>
                  {colorMode === "light" ? (
                    <Text>Dark Mode</Text>
                  ) : (
                    <Text>Light Mode</Text>
                  )}
                </Box>
              </Stack>
            </Box>
          ) : null}
        </Box>
      </>
    )
  }
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
                    src={data?.me.image}
                  />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      src={data?.me.image}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>{data?.me.firstName} {data?.me.lastName}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem onClick={() => goProfilePage(data?.me._id)}>Profile</MenuItem>
                  <MenuItem onClick={() => handleSignout()} >Logout</MenuItem>
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
              <Box onClick={toggleColorMode}>
                {colorMode === "light" ? (
                  <Text>Dark Mode</Text>
                ) : (
                  <Text>Light Mode</Text>
                )}
              </Box>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}