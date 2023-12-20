import {
  Box,
  FormControl,
  Input,
  Heading,
  Flex,
  useToast,
  Spinner,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let url = process.env.REACT_APP_LOCAL_URL;
  let toast = useToast();
  const navigate = useNavigate();

  let initialState = {
    id: "shashi@gmail.com",
    pass: "1234",
  };

  const [state, dispatch] = useReducer(loginReducer, initialState);
  const [spinner, setSpinner] = useState(false);

  function loginReducer(state, action) {
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

  function handleSubmit(e) {
    e.preventDefault();
    setSpinner(true);
    axios
      .get(`${url}/users/${state.id}`)
      .then((res) => {
        if (res.data.pass == state.pass) {
          callingSuccessToast(
            "Login Success.",
            `Welcome back ${res.data.name}.`
          );
          setTimeout(() => {
            navigate("/");
          }, 2000);
          localStorage.setItem("user", res.data.name);
          // localStorage.setItem(res.data.name, JSON.stringify([]));
          if (!localStorage.getItem(res.data.name)) {
            localStorage.setItem(res.data.name, JSON.stringify([]));
          }
          localStorage.setItem("userID", res.data.id);
        } else {
          callingErrorToast(
            "Something went wrong!",
            "Please check your Email and Password and try again."
          );
        }
      })
      .catch((err) => {
        console.log(err);
        callingErrorToast(
          "Something went wrong!",
          "Please check your Email and Password and try again"
        );
      })
      .finally(() => {
        dispatch({ type: "HANDLE_RESET" });
        setSpinner(false);
      });
  }

  function handleChange(e) {
    let { name, value } = e.target;
    let payload = {};
    payload[name] = value;
    dispatch({ type: "HANDLE_CHANGE", payload });
  }

  let { id, pass } = state;

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
          Login Here
        </Heading>
        <Box p={4}>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <Input
                name="id"
                required
                placeholder={"Enter your Email"}
                type="email"
                value={id}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl pt={3}>
              <Input
                required
                name="pass"
                placeholder={"Enter your Password"}
                type="password"
                value={pass}
                onChange={handleChange}
              />
            </FormControl>
            <Box pt={3}>
              <Button
                _hover={{ backgroundColor: "brand.100" }}
                w={"100%"}
                bg={"brand.100"}
                color={"white"}
                type="submit"
                fontSize={"large"}
                fontWeight={600}
                cursor={"pointer"}
              >
                {spinner ? <Spinner /> : "Log In"}
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

export default Login;
