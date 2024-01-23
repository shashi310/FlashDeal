import {
  Box,
  Flex,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Button,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cartLen } from "../../context/CartLengthContext";
import { motion, transform } from "framer-motion";

const UserAndCart = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  const { initialState, updateInitialState } = useContext(cartLen);

  const [user, setUser] = useState(null);
  const [cartLength, setCartLength] = useState(0);
  const [adminLink, setAdminLink] = useState(false);
  useEffect(() => {
    setUser(localStorage.getItem("user") || null);
    // setCartLength(initialState);
    setCartLength(JSON.parse(localStorage.getItem(user))?.length || 0);
    setAdminLink(user === "Max");
  }, [user, initialState]);

  useEffect(() => {
    setCartLength(JSON.parse(localStorage.getItem(user))?.length || 0);
  });

  function callingWarningToast(title, message) {
    toast({
      title: title,
      description: message,
      status: "warning",
      duration: 4000,
      isClosable: true,
      position: "top",
    });
  }

  if (location.pathname == "/adminLogin") {
    return "";
  }


  return (
    <Flex align={"center"}>
      <Box cursor={"pointer"} p={4}>
        <Flex align={"center"}>
          <Text fontSize={{ base: "md", lg: "large" }} mr={2}>
            Cart
          </Text>
          <Box position={"relative"} fontSize={{ base: "small", lg: "large" }}>
            <Link to={"/cart"}>
              <Flex
                display="flex"
                justifyContent="center"
                alignItems={"center"}
                top={"-9px"}
                right="-12px"
                backgroundColor={"white"}
                color="black"
                borderRadius={"50%"}
                w={"17px"}
                h={"17px"}
                fontSize={{ base: "small" }}
                position={"absolute"}
              >
                {cartLength}
              </Flex>
              <i className="fa-solid fa-cart-shopping"></i>
            </Link>
          </Box>
        </Flex>
      </Box>
      <Popover trigger="hover">
        <Box
          cursor={"pointer"}
          p={2}
          _hover={{
            background: "#333",
            color: "",
            borderTopRadius: "5px",
          }}
          //   borderRight={"1px solid RGBA(0, 0, 0, 0.24)"}
        >
          <PopoverTrigger>
            <Flex align={"center"}>
              <Text fontSize={{ base: "md", lg: "large" }} mr={2}>
                {user ? user : "User"}
              </Text>

              <Flex
                borderRadius={50}
                justify={"center"}
                align={"center"}
                fontSize={{ base: "small", lg: "large" }}
                h={{ base: 7, lg: 10 }}
                w={{ base: 7, lg: 10 }}
                bg={"RGBA(0, 0, 0, 0.24)"}
              >
                <i className="fa-solid fa-user"></i>
              </Flex>
            </Flex>
          </PopoverTrigger>
          <PopoverContent borderColor="#333" w={"10rem"} bg={"#333"}>
            {/* <PopoverArrow /> */}
            {/* <PopoverHeader>Confirmation!</PopoverHeader> */}
            <PopoverBody borderColor={"#333"}>
              <Box
                _hover={{
                  backgroundColor: "RGBA(255, 255, 255, 0.24)",
                  borderRadius: "6px",
                }}
                pb={2}
                pt={2}
                mb={"2px"}
                mt={"2px"}
              >
                <motion.div whileHover={{ translateX: "10px" }}>
                  Hello, {user ? user : "User"}
                </motion.div>
              </Box>
              <Box
                _hover={{
                  backgroundColor: "RGBA(255, 255, 255, 0.24)",
                  borderRadius: "6px",
                }}
                pb={2}
                pt={2}
                mb={"2px"}
                mt={"2px"}
              >
                <motion.div whileHover={{ translateX: "10px" }}>
                  <Link to={"/orders"}>Orders</Link>
                </motion.div>
                
              </Box>

{/* admin */}
{adminLink && <Box
                _hover={{
                  backgroundColor: "RGBA(255, 255, 255, 0.24)",
                  borderRadius: "6px",
                }}
                pb={2}
                pt={2}
                mb={"2px"}
                mt={"2px"}
              >
                <motion.div whileHover={{ translateX: "10px" }}>
                  <Link to={"/admin"}>Admin</Link>
                </motion.div>
                
              </Box>}
              
              {!user ? (
                <Button
                  _hover={{
                    background: "RGBA(255, 255, 255, 0.48)",
                    color: "",
                    borderTopRadius: "5px",
                  }}
                  variant={"solid"}
                  fontWeight={500}
                  w={"100%"}
                  bg={"RGBA(255, 255, 255, 0.48)"}
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  {" "}
                  <motion.div whileHover={{ fontSize: "large" }}>
                    Sign In
                  </motion.div>
                </Button>
              ) : (
                <Button
                  _hover={{
                    background: "RGBA(255, 255, 255, 0.48)",
                    color: "",
                    borderTopRadius: "5px",
                  }}
                  variant={"solid"}
                  fontWeight={500}
                  w={"100%"}
                  bg={"RGBA(255, 255, 255, 0.48)"}
                  onClick={() => {
                    localStorage.removeItem("user");
                    setUser(null);
                    callingWarningToast(
                      "Logged Out",
                      "Thankyou for shopping with us."
                    );
                    updateInitialState();
                    setCartLength(0);
                    navigate("/");
                  }}
                >
                  <motion.div whileHover={{ fontSize: "large" }}>
                    Sign Out
                  </motion.div>
                </Button>
              )}
            </PopoverBody>
          </PopoverContent>
        </Box>
      </Popover>
    </Flex>
  );
};

export default UserAndCart;
