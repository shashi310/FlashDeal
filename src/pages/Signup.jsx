import React, { useReducer, useState } from "react";
import {
  Box,
  FormControl,
  Input,
  Heading,
  Flex,
  useToast,
  Button,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  let url = process.env.REACT_APP_LOCAL_URL;

  let initialState = {
    name: "",
    id: "",
    pass: "",
    confirmPass: "",
  };

  const [state, dispatch] = useReducer(signUpReducer, initialState);

  const toast = useToast();
  const [spinner, setSpinner] = useState(false);
  const navigate = useNavigate();

  function callingSuccessToast(title, message) {
    toast({
      title: title,
      description: message,
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
  }

  function callingErrorToast(title, message) {
    toast({
      title: title,
      description: message,
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  }

  function signUpReducer(state, action) {
    switch (action.type) {
      case "HANDLE_CHANGE": {
        return { ...state, ...action.payload };
      }

      case "HANDLE_RESET": {
        return initialState;
      }

      default: {
        throw new Error("Invalid Action Type", action.type);
      }
    }
  }

  function addUserAndDetails() {
    axios
      .post(`${url}/users`, {
        id: state.id,
        name: state.name,
        pass: state.pass,
        history: [],
      })
      .then((res) => {
        callingSuccessToast(
          "User Created.",
          "User has been successfully registered."
        );
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function addUserToExisting() {
    axios
      .post(`${url}/existing`, { id: state.id })
      .then((res) => {
        addUserAndDetails();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setSpinner(false);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSpinner(true);
    if (state.pass == state.confirmPass) {
      axios
        .get(`${url}/existing/${state.id}`)
        .then((res) => {
          callingErrorToast(
            "User Already Exists!",
            "Please move to login page."
          );
        })
        .catch((err) => {
          addUserToExisting();
        })
        .finally(() => {
          dispatch({ type: "HANDLE_RESET" });
          setSpinner(false);
        });
    } else {
      callingErrorToast("Error!", "Please Check your Password.");
      dispatch({ type: "HANDLE_RESET" });
      setSpinner(false);
    }
  }

  function handleChange(e) {
    let { name, value } = e.target;
    let payload = {};
    payload[name] = value;
    dispatch({ type: "HANDLE_CHANGE", payload });
  }

  let { name, id, pass, confirmPass } = state;

  return (
    <Flex
      minH={{
        base: "28.5rem",
        sm: "30rem",
        md: "55rem",
        lg: "29rem",
        xl: "41rem",
        "2xl": "38.9rem",
      }}
      justify={"center"}
      align={"center"}
    >
      <Box
        boxShadow={
          "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;"
        }
        w={{ base: "90%", md: "70%", lg: "40%", "2xl": "30%" }}
        m={"auto"}
        mt={"40px"}
        mb={"40px"}
        borderRadius={"5px"}
        bg={"white"}
      >
        <Heading
          color={"black"}
          pt={4}
          textAlign={"center"}
          pb={4}
          fontWeight={600}
        >
          Signup Here
        </Heading>
        <Box p={4}>
          <form onSubmit={handleSubmit}>
            <FormControl isRequired>
              <Input
                name="name"
                value={name}
                onChange={handleChange}
                required
                placeholder={"Enter your Name"}
                type="text"
              />
            </FormControl>
            <FormControl pt={3} isRequired>
              <Input
                name="id"
                value={id}
                onChange={handleChange}
                required
                placeholder={"Enter your Email"}
                type="email"
              />
            </FormControl>
            <FormControl pt={3}>
              <Input
                name="pass"
                onChange={handleChange}
                value={pass}
                required
                placeholder={"Enter your Password"}
                type="password"
              />
            </FormControl>
            <FormControl pt={3}>
              <Input
                name="confirmPass"
                value={confirmPass}
                onChange={handleChange}
                required
                placeholder={"Confirm your Password"}
                type="password"
              />
            </FormControl>
            <Box pt={3}>
              <Button
                _hover={{ backgroundColor: "brand.100" }}
                bg={"brand.100"}
                color={"white"}
                w={"100%"}
                type="submit"
                disabled={spinner}
                fontSize={"large"}
                fontWeight={600}
                cursor={"pointer"}
              >
                {spinner ? <Spinner /> : "Sign Up"}
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

export default Signup;
