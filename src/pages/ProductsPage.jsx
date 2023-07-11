import { Box, Flex } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import Pagination from "../components/ProductPage/Pagination";
import ProductContainer from "../components/ProductPage/ProductContainer";
import Sidebar from "../components/ProductPage/Sidebar";
import { searchContext } from "../context/SearchContext";

const ProductsPage = ({ searchString }) => {
  // Only the first page was getting sorted properly the name(rating/price)
  // and val(asc/desc) was getting reset so use useRef to avoid that
  // now only on refresh the data gets reset.

  let sortRef = useRef({ sorting: false, name: "", val: "" });

  const [productsData, setProductsData] = useState([]);
  const [category, setCategory] = useState("");
  const [gender, setGender] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  let url = `${process.env.REACT_APP_LOCAL_URL}/products?_page=${page}&_limit=10`;

  useEffect(() => {
    if (sortRef.current.sorting) {
      fetchAndRenderSortedData();
      return;
    }
    fetchAndRender();
  }, [page, gender, category, sort]);

  let { string, searchBtn, handleOffSearchBtn } = useContext(searchContext);

  useEffect(() => {
    if (searchBtn) {
      fetchAndRenderSearchData();
    }
  }, [searchBtn]);

  async function fetchAndRenderSearchData() {
    try {
      let data = await axios
        .get(url, {
          params: {
            q: string,
          },
        })
        .then((res) => {
          setTotalPage(
            Math.ceil(Number(res.headers.get("x-total-count")) / 10)
          );
          handleOffSearchBtn();
          return res.data;
        });
      setProductsData(data);
    } catch (error) {
      console.log(error);
    }
  }

  function categoryChange(productCategory) {
    sortRef.current.sorting = false;
    setCategory(productCategory);
    fetchAndRender();
    // console.log(category);
    // console.log(sortRef.current.sorting);
  }

  async function fetchAndRenderSortedData() {
    let data = await axios
      .get(`${url}&_sort=${sort.name}&_order=${sort.val}`)
      .then((res) => {
        setTotalPage(Math.ceil(Number(res.headers.get("x-total-count")) / 10));
        return res.data;
      })
      .catch((err) => console.log(err));
    setProductsData(data);
  }

  function genderChange(gen) {
    sortRef.current.sorting = false;
    setGender(gen);
  }

  function changePage(num) {
    setPage(page + num);
  }

  function searchProducts(params) {}

  function sortProducts(name, val) {
    setSort({ name, val });
    sortRef.current.sorting = true;
    sortRef.current.name = name;
    sortRef.current.val = val;
  }

  async function fetchAndRender() {
    // console.log("entered");
    if (gender && category) {
      url = `${url}&gender=${gender}&category=${category}`;
    } else if (gender) {
      url = `${url}&gender=${gender}`;
    } else if (category) {
      url = `${url}&category=${category}`;
    }

    try {
      let data = await getData(url);
      setProductsData(data);
    } catch (error) {
      console.log(error);
    }
  }

  function getData(url) {
    return axios.get(`${url}`).then((res) => {
      setTotalPage(Math.ceil(Number(res.headers.get("x-total-count")) / 10));
      return res.data;
    });
  }

  return (
    <Box w={{ base: "90%", xl: "95%" }} m="auto" mt={4} mb={8}>
      <Flex direction={{ base: "column", xl: "row" }}>
        <Box w={{ xl: "20%", "2xl": "20%" }}>
          <Sidebar
            categoryChange={categoryChange}
            genderChange={genderChange}
            sortProducts={sortProducts}
          />
        </Box>
        <Box w={{ xl: "80%", "2xl": "80%" }}>
          <ProductContainer product={productsData} />
          {productsData.length > 0 ? (
            <Pagination changePage={changePage} count={totalPage} page={page} />
          ) : (
            ""
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default ProductsPage;
