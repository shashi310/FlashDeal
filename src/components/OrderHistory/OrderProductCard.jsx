import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";

const OrderProductCard = ({ data }) => {
  return (
    <Box bg={"white"} p={2} m={4}>
      <Flex>
        <Box w={{ base: "40%", md: "20%", lg: "12%", "2xl": "10%" }}>
          <Image w={"100%"} src={data.image} />
        </Box>
        <Box ml={2} w={{ base: "80%", md: "60%", lg: "80%" }}>
          <Heading fontSize={{ base: "small", md: "lg", lg: "xl" }}>
            {data.name}
          </Heading>
          <Text fontSize={{ base: "small", md: "lg", lg: "xl" }}>
            Size : {data.size}
          </Text>
          <Text fontSize={{ base: "small", md: "lg", lg: "xl" }}>
            Price : {data.price}
          </Text>
          <Text fontSize={{ base: "small", md: "lg", lg: "xl" }}>
            Qty : {data.Qty}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default OrderProductCard;
