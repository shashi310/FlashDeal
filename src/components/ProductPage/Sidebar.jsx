import {
  Box,
  Button,
  Collapse,
  Flex,
  Radio,
  RadioGroup,
  Select,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Category from "./Category";
import Gender from "./Gender";

const Sidebar = ({ genderChange, categoryChange, sortProducts }) => {
  function handleSorting(e) {
    let { name, value, type } = e.target;
    let sortBy = value.split(" ")[0];
    let sortVal = value.split(" ")[1];
    sortProducts(sortBy, sortVal);
  }

  return (
    <Box fontSize={"lg"}>
      <Flex
        direction={{ base: "column", md: "row", xl: "column" }}
        align={{ base: "", md: "center" }}
        justify={{
          base: "space-between",
          md: "space-around",
          xl: "space-between",
        }}
      >
        <Box w={{ base: "100%", md: "25%", xl: "100%" }} p={4}>
          <Category categoryChange={categoryChange} />
        </Box>
        <Box w={{ base: "100%", md: "25%", xl: "100%" }} p={4}>
          <Gender genderChange={genderChange} />
        </Box>
        <Box w={{ base: "100%", md: "25%", xl: "100%" }}>
          <Select onChange={handleSorting} placeholder="Sort ">
            <option value="price desc">Price High to Low</option>
            <option value="price asc">Price Low to High</option>
            <option value="rating desc">Rating High to Low</option>
            <option value="rating asc">Rating Low to High</option>
          </Select>
        </Box>
      </Flex>
    </Box>
  );
};

export default Sidebar;
