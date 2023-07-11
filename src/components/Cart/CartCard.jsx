import {
  Box,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Heading,
  Text,
  Button,
  background,
  Flex,
} from "@chakra-ui/react";
import React, { useState } from "react";

const CartCard = ({ product, handleQty, handleRemove }) => {
  return (
    <Box borderRadius={"5px"} p={2}>
      <Flex
        borderRadius={"5px"}
        justifyContent={{ base: "space-between", "2xl": "center" }}
        p={2}
        bg={"white"}
        direction={{ base: "row", sm: "row" }}
        overflow="hidden"
        variant="outline"
      >
        <Box w={{ base: "30%", xl: "30%", xl: "100%", "2xl": "20%" }}>
          <Image
            w={{ base: "100%", sm: "140px", lg: "100px", "2xl": "80%" }}
            src={product.image}
            alt={product.name}
            objectFit="contain"
          />
        </Box>

        <Box w={{ base: "65%", xl: "70%" }}>
          <Heading fontSize={{ base: "small", lg: "md", "2xl": "xl" }}>
            {product.name}
          </Heading>

          <Text fontSize={{ base: "small", lg: "md" }}>
            Price : ₹ {product.price}
          </Text>
          <Text fontSize={{ base: "small", lg: "md" }}>
            Size : {product.size}
          </Text>
          <Box>
            <Button
              fontSize={{ base: "small", lg: "md" }}
              bg={"white"}
              _hover={{ backgroundColor: "white" }}
              fontWeight={500}
              //   fontSize={"xl"}
              onClick={() => handleQty(product, 1)}
            >
              +
            </Button>
            <Button
              fontSize={{ base: "small", lg: "md" }}
              _hover={{ backgroundColor: "white" }}
              bg={"white"}
            >
              {product.Qty}
            </Button>
            <Button
              w={{ base: "50px" }}
              h={{ base: "50px" }}
              pb={2}
              fontSize={{ base: "md", lg: "xl", xl: "2xl" }}
              onClick={() => handleQty(product, -1)}
              bg={"white"}
              _hover={{ backgroundColor: "white" }}
              fontWeight={500}
              //   fontSize={"2xl"}
            >
              -
            </Button>
          </Box>

          <Button
            fontSize={{ base: "small", xl: "md" }}
            onClick={() => handleRemove(product.id)}
            _hover={{ backgroundColor: "brand.100" }}
            variant="solid"
            bg="brand.100"
            color={"white"}
          >
            <Flex justify={"center"} align={"center"}>
              <Box fontSize={"lg"} mr={2} pt={"1px"}>
                <i className="fa-solid fa-xmark"></i>
              </Box>{" "}
              <Box>Remove</Box>
            </Flex>
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default CartCard;
