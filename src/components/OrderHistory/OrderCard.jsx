import { Box, Text } from "@chakra-ui/react";
import React from "react";
import OrderProductCard from "./OrderProductCard";

const OrderCard = ({ data }) => {
  return (
    <Box bg={"white"} p={2} m={4}>
      <Box>
        <Text>{data.date}</Text>
        <Box>
          {data.prducts.map((product, i) => {
            return <OrderProductCard key={i} data={product} />;
          })}
        </Box>
        <Text
          mr={{ "2xl": "2rem" }}
          fontWeight={600}
          fontSize={{ base: "small", md: "lg", lg: "xl" }}
          textAlign={"right"}
        >
          Total:₹{data.orderTotal}
        </Text>
      </Box>
    </Box>
  );
};

export default OrderCard;
