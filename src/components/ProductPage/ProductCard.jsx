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
import { useNavigate } from "react-router-dom";

const ProductCard = ({ item }) => {
  let navigate = useNavigate();

  function handleSingleProduct(item) {
    localStorage.setItem("product", JSON.stringify(item));
    navigate("/singleProduct");
  }

  return (
    <Box onClick={() => handleSingleProduct(item)}>
      <Card
        cursor={"pointer"}
        minH={{ md: "503px", lg: "420px", "2xl": "394px" }}
        variant={"elevated"}
        maxW="sm"
        margin={"auto"}
      >
        <CardBody>
          <Image
            maxHeight={{ base: "402px", md: "373px", lg: "276px" }}
            src={item.image}
            alt={item.name}
            borderRadius="lg"
          />
          <Stack mt="4" spacing="0">
            <Heading mb={2} fontWeight={500} size="sm">
              {item.name.length > 54
                ? `${item.name.substring(0, 50)}...`
                : item.name}
            </Heading>
            <Flex fontWeight={600} align={"center"}>
              <Text fontSize="sm">Rating : </Text>
              <Text ml={1} color="gray" fontSize="sm">
                {item.rating}
              </Text>
            </Flex>
            <Text fontWeight={600} color="red" fontSize="sm">
              Rs. {item.price}
            </Text>
          </Stack>
        </CardBody>
      </Card>
    </Box>
  );
};

export default ProductCard;
