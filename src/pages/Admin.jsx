import {
  Box,
  Heading,
  Input,
  FormControl,
  FormLabel,
  Select,
  Grid,
  GridItem,
  Button,
  CloseButton,
  Flex,
  Spacer,
  Spinner,
  Center,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useReducer, useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "../App.css";
import ProductsContainer from "../components/Admin/ProductsContainer";

let url = `${process.env.REACT_APP_LOCAL_URL}`;
// let url = `https://shy-blue-gorilla-wear.cyclic.app`;
// let url = `https://json-server-k4we.onrender.com`;

const Admin = () => {
  const [out, setOut] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [productsData, setProductsData] = useState([]);
  const [editData, setEditData] = useState({
    name: "",
    price: "",
    rating: "",
    gender: "",
    category: "",
    image: "",
  });

  const headingRef = useRef();

  useEffect(() => {
    fetchAndRender();
  }, []);

  let productInitial = {
    name: "",
    price: "",
    rating: "",
    gender: "",
    category: "",
    image: "",
  };

  function productReducer(state, action) {
    switch (action.type) {
      case "HANDLE_CHANGE": {
        return { ...state, ...action.payload };
      }

      case "HANDLE_RESET": {
        setSpinner(false);
        return productInitial;
      }

      default: {
        throw new Error("Invalid Action Type", action.type);
      }
    }
  }

  const [state, dispatch] = useReducer(productReducer, productInitial);

  async function fetchAndRender() {
    try {
      let data = await getData();
      // console.log(data, "DATA");
      setProductsData(data.reverse());
    } catch (error) {
      console.log(error);
    }
  }

  function getData() {
    return axios.get(`${url}/products`).then((res) => res.data);
  }

  function addProduct(e) {
    e.preventDefault();
    setShowEditForm(false);
    setSpinner(true);
    axios
      .post(`${url}/products`, state)
      .then((res) => {
        dispatch({ type: "HANDLE_RESET" });
        fetchAndRender();
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "HANDLE_RESET" });
      })
      .finally(() => {
        setShowAddForm(false);
      });
  }

  function handleChange(e) {
    let { name, value, type } = e.target;
    let payload = {};
    payload[name] = type == "number" ? Number(value) : value;
    dispatch({ type: "HANDLE_CHANGE", payload: payload });
  }

  function handleEdit(data) {
    setShowAddForm(false);
    setShowEditForm(true);
    setEditData(data);
    headingRef.current.scrollIntoView();
  }

  function handleEditChange(e) {
    let { name, value, type } = e.target;

    let payload = {};
    payload[name] = value;
    setEditData({ ...editData, ...payload });
  }

  function handleDelete(id) {
    // console.log(id);
    axios
      .delete(`${url}/products/${id}`)
      .then(() => {
        fetchAndRender();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleEditProduct(e) {
    e.preventDefault();
    setSpinner(true);
    axios
      .put(`${url}/products/${editData.id}`, editData)
      .then((res) => {
        setShowEditForm(false);
        fetchAndRender();
      })
      .catch((err) => {
        setShowEditForm(false);
        console.log(err);
      })
      .finally(() => {
        setSpinner(false);
      });
  }

  function handleLogout() {
    localStorage.removeItem("admin");
    setOut(true);
  }

  const { name, price, rating, gender, category, image } = state;

  if (out) {
    return <Navigate to={"/adminLogin"} />;
  }

  return (
    <>
      <Box
        mb={18}
        p={3}
        pl={{ base: 3, md: 20 }}
        pr={{ base: 3, md: 20 }}
        color="white"
        bg={"brand.100"}
      >
        <Flex align={"center"}>
          <Link to={"/"}>
            <Flex cursor={"pointer"} align={"center"}>
              <Text mr={2} fontSize={"2xl"}>
                <i className="fa-solid fa-box-open"></i>
              </Text>
              <Text fontSize={{ base: "xl", lg: "2xl" }}>FlashDeal</Text>
            </Flex>
          </Link>
          <Spacer />
          <Flex cursor={"pointer"} align={"center"}>
            <Text mr={2} fontSize={{ base: "2xl", lg: "3xl" }}>
              <i className="fa-solid fa-id-badge"></i>
            </Text>
            <Heading
              fontSize={{ base: "xl", lg: "2xl" }}
              ref={headingRef}
              fontWeight={400}
              onClick={handleLogout}
            >
              <Tooltip label="Click to log out" aria-label="A tooltip">
                ADMIN
              </Tooltip>
            </Heading>
          </Flex>
        </Flex>
      </Box>
      {showAddForm ? (
        <Box
          p={4}
          className="AdminForm"
          w={{ base: "90%", md: "70%", lg: "50%", "2xl": "40%" }}
          m={"auto"}
          mb={20}
          mt={20}
        >
          <form onSubmit={addProduct}>
            <Flex>
              <Spacer />
              <CloseButton
                onClick={() => {
                  setShowAddForm(false);
                }}
              />
            </Flex>

            <FormControl isRequired mt={2}>
              <FormLabel>Product Name</FormLabel>
              <Input
                value={name}
                onChange={handleChange}
                name="name"
                type="text"
              />
            </FormControl>
            <FormControl isRequired mt={2}>
              <FormLabel>Product Price</FormLabel>
              <Input
                value={price}
                onChange={handleChange}
                name="price"
                type="number"
              />
            </FormControl>
            <FormControl isRequired mt={2}>
              <FormLabel>Product Rating</FormLabel>
              <Input
                value={rating}
                onChange={handleChange}
                name="rating"
                type="number"
              />
            </FormControl>

            <Grid
              templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
              gap={{ base: 2, lg: 6 }}
            >
              <GridItem>
                <FormControl isRequired mt={2}>
                  <FormLabel>Product Gender</FormLabel>
                  <Select
                    value={gender}
                    onChange={handleChange}
                    name="gender"
                    placeholder="Select Gender"
                  >
                    <option value="Mens">Men</option>
                    <option value="Womens">Women</option>
                    <option value="Boys">Boys</option>
                    <option value="Girls">Girls</option>
                  </Select>
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl isRequired mt={2}>
                  <FormLabel>Product Category</FormLabel>
                  <Select
                    value={category}
                    onChange={handleChange}
                    name="category"
                    placeholder="Select Category"
                  >
                    <option value="Top">Top</option>
                    <option value="Bottom">Bottom</option>
                    <option value="Dress">Dress</option>
                    <option value="Footware">Footware</option>
                    <option value="Accessories">Accessories</option>
                  </Select>
                </FormControl>
              </GridItem>
            </Grid>
            <FormControl isRequired mt={2}>
              <FormLabel>Product Image</FormLabel>
              <Input
                value={image}
                onChange={handleChange}
                name="image"
                type="text"
              />
            </FormControl>
            <FormControl width={"50%"} m={"auto"} mt={4}>
              {spinner ? (
                <Center>
                  <Spinner color="red.500" />
                </Center>
              ) : (
                <Input
                  cursor="pointer"
                  bg={"#e40046"}
                  color="white"
                  type="submit"
                  value={"Add"}
                />
              )}
            </FormControl>
          </form>
        </Box>
      ) : showEditForm ? (
        <Box
          p={4}
          className="AdminForm"
          w={{ base: "90%", md: "70%", lg: "50%", "2xl": "40%" }}
          m={"auto"}
          mt={20}
          mb={20}
        >
          <form onSubmit={handleEditProduct}>
            <Flex>
              <Spacer />
              <CloseButton
                onClick={() => {
                  setShowEditForm(false);
                }}
              />
            </Flex>

            <FormControl isRequired mt={2}>
              <FormLabel>Product Name</FormLabel>
              <Input
                value={editData.name}
                onChange={handleEditChange}
                name="name"
                type="text"
              />
            </FormControl>
            <FormControl isRequired mt={2}>
              <FormLabel>Product Price</FormLabel>
              <Input
                value={editData.price}
                onChange={handleEditChange}
                name="price"
                type="number"
              />
            </FormControl>
            <FormControl isRequired mt={2}>
              <FormLabel>Product Rating</FormLabel>
              <Input
                value={editData.rating}
                onChange={handleEditChange}
                name="rating"
                type="number"
              />
            </FormControl>

            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              <GridItem>
                <FormControl isRequired mt={2}>
                  <FormLabel>Product Gender</FormLabel>
                  <Select
                    value={editData.gender}
                    onChange={handleEditChange}
                    name="gender"
                    placeholder="Select Gender"
                  >
                    <option value="Mens">Men</option>
                    <option value="Womens">Women</option>
                    <option value="Boys">Boys</option>
                    <option value="Girls">Girls</option>
                  </Select>
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl isRequired mt={2}>
                  <FormLabel>Product Category</FormLabel>
                  <Select
                    value={editData.category}
                    onChange={handleEditChange}
                    name="category"
                    placeholder="Select Category"
                  >
                    <option value="Top">Top</option>
                    <option value="Bottom">Bottom</option>
                    <option value="Dress">Dress</option>
                    <option value="Footware">Footware</option>
                    <option value="Accessories">Accessories</option>
                  </Select>
                </FormControl>
              </GridItem>
            </Grid>
            <FormControl isRequired mt={2}>
              <FormLabel>Product Image</FormLabel>
              <Input
                value={editData.image}
                onChange={handleEditChange}
                name="image"
                type="text"
              />
            </FormControl>
            <FormControl width={"50%"} m={"auto"} mt={4}>
              {spinner ? (
                <Center>
                  <Spinner color="red.500" />
                </Center>
              ) : (
                <Input
                  cursor="pointer"
                  bg={"#e40046"}
                  color="white"
                  type="submit"
                  value={"Edit"}
                />
              )}
            </FormControl>
          </form>
        </Box>
      ) : (
        <Box>
          <Button
            m={5}
            onClick={() => {
              setShowAddForm(true);
            }}
          >
            Add Product
          </Button>
        </Box>
      )}

      <Box>
        <ProductsContainer
          handleEdit={handleEdit}
          productsData={productsData}
          handleDelete={handleDelete}
        />
      </Box>
    </>
  );
};

export default Admin;
