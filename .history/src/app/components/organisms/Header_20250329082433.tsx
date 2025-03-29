"use client";

import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Collapse,
  Flex,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import CartShop from "../molecules/Cart";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

export default function Header() {
  const { isOpen, onToggle } = useDisclosure();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Box position="fixed" top={0} width="100%" zIndex={10}>
      <Flex
        bg={useColorModeValue("whiteAlpha.900", "gray.800")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex
          flex={{ base: 1 }}
          justify={{ base: "center", md: "start" }}
          alignItems={"center"}
        >
          <Link href="/" passHref>
            <Image
              className="object-cover"
              alt="1"
              width={10}
              height={10}
              src="/logo.png"
            />
          </Link>
          <Flex
            display={{ base: "none", md: "flex" }}
            alignItems={{ base: "start" }}
            ml={10}
          >
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <CartShop />

          {isLoggedIn ? (
            <>
              <Menu>
                <MenuButton
                  as={Button}
                  aria-label="Shopping cart"
                  width={10}
                  height={10}
                  variant="outline"
                  rounded={"full"}
                  bgImage="url('/cat.jpg')"
                  bgSize="cover"
                  bgPosition="center"
                  _hover={{
                    objectFit: "cover",
                    bgImage: "url('/cat.jpg')",
                    opacity: 0.9,
                    transform: "scale(1.05)",
                  }}
                  borderColor="gray.200"
                  _active={{
                    objectFit: "cover",
                    bgImage: "url('/cat.jpg')",
                    transform: "scale(0.98)",
                  }}
                />
                <MenuList>
                  <MenuItem>Create a Copy</MenuItem>
                  <MenuItem>Mark as Draft</MenuItem>
                  <MenuItem>Delete</MenuItem>
                  <MenuItem> Đăng xuất</MenuItem>
                </MenuList>
              </Menu>
            </>
          ) : (
            <>
              <Button
                as={Link}
                fontSize={"sm"}
                fontWeight={400}
                variant={"link"}
                href={"/sign-in"}
              >
                Đăng nhập
              </Button>
              <Button
                as={Link}
                display={{ base: "none", md: "inline-flex" }}
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"red.400"}
                href={"/signup"}
                _hover={{
                  bg: "red.500",
                }}
              >
                Đăng ký
              </Button>
            </>
          )}
        </Stack>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}
