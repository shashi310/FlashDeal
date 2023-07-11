import {
  Box,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  Text,
  Flex,
  Input,
  Spacer,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { HamburgerIcon } from "@chakra-ui/icons";
import React, { useContext, useEffect, useState } from "react";
import SearchInput from "./SearchInput";
import NavCategory from "./NavCategory";
import UserAndCart from "./UserAndCart";
import { Link, useLocation } from "react-router-dom";
import { searchContext } from "../../context/SearchContext";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { handleSearchString, handleOnSearchBtn } = useContext(searchContext);

  const location = useLocation();

  return (
    <>
      <Box
        pl={{ base: 2, lg: 45 }}
        pr={{ base: 0, lg: 45 }}
        color={"white"}
        bg={"brand.100"}
      >
        <Flex align={"center"}>
          <Link to={"/"}>
            <Flex p={4}>
              <Text mr={2} fontSize={{ base: "20px", lg: "2xl" }}>
                <i className="fa-solid fa-box-open"></i>
              </Text>
              <Text fontSize={{ base: "xl", lg: "2xl" }}>FlashDeal</Text>
            </Flex>
          </Link>
          <Spacer />
          {/* <HamburgerIcon fontSize={"2xl"} onClick={onOpen} /> */}
          {/* <Spacer /> */}

          {location.pathname == "/signup" ||
          location.pathname == "/login" ||
          location.pathname == "/adminLogin" ? (
            ""
          ) : (
            <Box display={{ base: "none", md: "block" }}>
              <SearchInput />
            </Box>
          )}
          <Spacer />

          {location.pathname == "/signup" ? (
            <motion.div whileHover={{ scale: 1.2 }}>
              <Text fontSize={"xl"} p={4}>
                <Link to={"/login"}>Login</Link>
              </Text>
            </motion.div>
          ) : location.pathname == "/login" ? (
            <motion.div whileHover={{ scale: 1.2 }}>
              <Text fontSize={"xl"} p={4}>
                <Link to={"/signup"}>Signup</Link>
              </Text>
            </motion.div>
          ) : (
            <UserAndCart />
          )}
          {/* <Spacer /> */}
        </Flex>
        <Box>
          <Drawer
            h="fit-content"
            placement={"top"}
            onClose={onClose}
            isOpen={isOpen}
          >
            <DrawerOverlay />
            <DrawerContent w={"fit-content"} h={"fit-content"}>
              <Text fontSize={"sm"} p={3} pb={0} pl={4}>
                TOP CATEGORIES
              </Text>
              <DrawerBody pl={1} pr={1}>
                <NavCategory />
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Box>
      </Box>

      {location.pathname == "/signup" ||
      location.pathname == "/login" ||
      location.pathname == "/adminLogin" ? (
        ""
      ) : (
        <Box display={{ base: "block", md: "none" }}>
          <Flex
            m={"auto"}
            p={4}
            w={{ base: "100%", md: "100%" }}
            justify={"center"}
          >
            <Link to={"/products"}>
              <Input
                onChange={(e) => {
                  handleSearchString(e.target.value);
                }}
                w={"100%"}
                color="black"
                borderRightRadius={"0"}
                bg={"white"}
              />
            </Link>
            <Button
              onClick={handleOnSearchBtn}
              fontWeight={400}
              color="white"
              pl={{ md: 5 }}
              pr={{ md: 5 }}
              borderLeftRadius={"0"}
              _hover={{ background: "#333" }}
              bg={"#333"}
              variant="solid"
            >
              <i className="fa-solid fa-magnifying-glass"></i>{" "}
              <Text ml={2}>Search</Text>
            </Button>
          </Flex>
        </Box>
      )}
    </>
  );
};

export default Navbar;
