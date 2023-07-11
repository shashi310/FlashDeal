import {
  Box,
  Card,
  CardBody,
  Stack,
  Heading,
  Text,
  Image,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ data }) => {
  const navigate = useNavigate();

  function handleSingleProduct(item) {
    localStorage.setItem("product", JSON.stringify(item));
    navigate("/singleProduct");
  }

  return (
    <motion.div whileHover={{ scale: 1.2, zIndex: 1, cursor: "pointer" }}>
      <Card
        onClick={() => handleSingleProduct(data)}
        variant={"elevated"}
        height={"100%"}
        minW={"230px"}
      >
        <CardBody>
          <Image
            maxHeight={{ base: "402px", md: "373px", lg: "276px" }}
            src={data.image}
            alt={data.name}
            borderRadius="lg"
          />
          <Stack mt="4" spacing="0">
            <Heading mb={2} fontWeight={500} size="sm">
              {data.name.length > 54
                ? `${data.name.substring(0, 50)}...`
                : data.name}
            </Heading>
            <Flex fontWeight={600} align={"center"}>
              <Text fontSize="sm">Rating : </Text>
              <Text ml={1} color="gray" fontSize="sm">
                {data.rating}
              </Text>
            </Flex>
            <Text fontWeight={600} color="red" fontSize="sm">
              Rs. {data.price}
            </Text>
          </Stack>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
