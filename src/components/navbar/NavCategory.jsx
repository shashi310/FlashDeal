import { Box, Text } from "@chakra-ui/react";
import React from "react";

const NavCategory = () => {
  let hamburgerContent = [
    `Men's Fashion`,
    `Women's Fashion`,
    `Home and kitchen`,
    `Toys kids fashion..`,
    `Beauty, Health & Daily..`,
  ];
  return (
    <Box>
      {hamburgerContent.map((item, index) => {
        return (
          <Text
            border={"1px solid transparent"}
            borderLeft={`3px solid transparent `}
            key={index}
            _hover={{
              background: "gray.100",
              borderLeft: `3px solid #e40046`,
            }}
            fontSize={"sm"}
            p={2}
          >
            {item}
          </Text>
        );
      })}
    </Box>
  );
};

export default NavCategory;
