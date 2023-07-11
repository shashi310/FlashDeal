import React from "react";
import {
  Card,
  CardBody,
  Box,
  Stack,
  Heading,
  Text,
  ButtonGroup,
  Button,
  Image,
  Flex,
} from "@chakra-ui/react";

const Product = ({
  id,
  name,
  gender,
  price,
  image,
  category,
  rating,
  data,
  handleEdit,
  handleDelete,
}) => {
  return (
    <Box>
      <Card
        minH={{
          base: "500px",
          sm: "615px",
          md: "615px",
          lg: "570px",
          xl: "520px",
        }}
        maxH={"645px"}
        variant={"elevated"}
        maxW="sm"
        margin={"auto"}
      >
        <CardBody>
          <Image
            maxHeight={{ base: "402px", md: "373px", lg: "276px" }}
            src={image}
            alt={name}
            borderRadius="lg"
          />
          <Stack mt="4" spacing="0">
            <Heading mb={2} fontWeight={500} size="sm">
              {name.length > 54 ? `${name.substring(0, 50)}...` : name}
            </Heading>
            <Flex align={"center"}>
              <Text fontSize="sm">Rating : </Text>
              <Text ml={1} color="gray" fontSize="sm">
                {rating}
              </Text>
            </Flex>
            <Text color="red" fontSize="sm">
              Rs. {price}
            </Text>
            <Flex align={"center"}>
              <Text fontSize="sm">Gender : </Text>
              <Text ml={1} fontSize="sm">
                {gender}
              </Text>
            </Flex>
            <Flex align={"center"}>
              <Text fontSize="sm"> Category : </Text>
              <Text ml={1} fontSize="sm">
                {category}
              </Text>
            </Flex>
          </Stack>
        </CardBody>

        <ButtonGroup m={"auto"} mb={4} spacing="2">
          <Button
            onClick={() => {
              handleEdit(data);
            }}
            w={20}
            variant="ghost"
            colorScheme="green"
          >
            Edit
          </Button>
          <Button
            onClick={() => {
              handleDelete(id);
            }}
            w={20}
            variant="ghost"
            colorScheme="red"
          >
            Delete
          </Button>
        </ButtonGroup>
      </Card>
    </Box>
  );
};

export default Product;
