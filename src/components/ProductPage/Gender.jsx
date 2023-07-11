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

const Gender = ({ genderChange }) => {
  const { isOpen, onToggle } = useDisclosure();
  const [genderValue, setGenderValue] = useState("");

  useEffect(() => {
    genderChange(genderValue);
  }, [genderValue]);

  return (
    <Box>
      <Flex>
        <Box>
          <Text>Gender</Text>
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
        <RadioGroup pt={2} onChange={setGenderValue} value={genderValue}>
          <Flex direction="column">
            <Radio colorScheme={"red"} value="Mens">
              Men
            </Radio>
            <Radio colorScheme={"red"} value="Womens">
              Women
            </Radio>
            <Radio colorScheme={"red"} value="Boys">
              Boys
            </Radio>
            <Radio colorScheme={"red"} value="Girls">
              Girls
            </Radio>
          </Flex>
        </RadioGroup>
      </Collapse>
    </Box>
  );
};

export default Gender;
