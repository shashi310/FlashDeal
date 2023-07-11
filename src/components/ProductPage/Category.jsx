import {
  Box,
  Collapse,
  Flex,
  Radio,
  RadioGroup,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const Category = ({ categoryChange }) => {
  const { isOpen, onToggle } = useDisclosure();
  const [categoryValue, setCategoryValue] = useState("");

  useEffect(() => {
    categoryChange(categoryValue);
  }, [categoryValue]);

  return (
    <Box>
      <Flex>
        <Box>
          <Text>Category</Text>
        </Box>
        <Spacer />
        <Box>
          <Box display={!isOpen ? "block" : "none"} onClick={onToggle}>
            <i className="fa-solid fa-plus"></i>
          </Box>
          <Box display={isOpen ? "block" : "none"} onClick={onToggle}>
            <i className="fa-solid fa-minus"></i>
          </Box>
        </Box>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <RadioGroup pt={2} onChange={setCategoryValue} value={categoryValue}>
          <Flex direction="column">
            <Radio colorScheme={"red"} value="Top">
              Top
            </Radio>
            <Radio colorScheme={"red"} value="Bottom">
              Bottom
            </Radio>
            <Radio colorScheme={"red"} value="Dress">
              Dress
            </Radio>
            <Radio colorScheme={"red"} value="Footware">
              Footware
            </Radio>
            <Radio colorScheme={"red"} value="Accessories">
              Accessories
            </Radio>
          </Flex>
        </RadioGroup>
      </Collapse>
    </Box>
  );
};

export default Category;
