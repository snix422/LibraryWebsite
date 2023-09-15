import { useState, useContext } from "react";
import ProductItem, { IProductTypes } from "../main/ProductItem";
import Navbar from "../navbar/Navbar";
import { Box } from "@mui/material";
import Slider from "@mui/material/Slider";
import { Button, Typography } from "@mui/material";
import Rating from "@mui/material/Rating";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import CategoryContext from "../../context/CategoryContext";
import useFetchDependecies from "../customHook/useFetchDependecies";
import RatingFilter from "./Filter";
import Filter from "./Filter";

const CategoryFilter = () => {
  const { category } = useContext(CategoryContext);

  const [productByPrice, setProductsByPrice] = useState<any | IProductTypes>(
    []
  );

  const [filterByRating, setFilterByRating] = useState<any | IProductTypes>([]);

  const url = `https://bookstore-ce144-default-rtdb.europe-west1.firebasedatabase.app/Products.json`;

  const { products } = useFetchDependecies(url, category);

  const updateProductByPrice = (price: any) => {
    setProductsByPrice(price);
  };

  const updateFilterByRating = (rating: any) => {
    setFilterByRating(rating);
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          width: "100vw",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          alignItems: "center",
          paddingBottom:'40px'
        }}
      >
        <Filter
          dataProduct={products}
          productPrice={updateProductByPrice}
          ratingFilter={updateFilterByRating}
        />
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: {
              xl:'150px',
              lg:'100px',
              md:'80px',
              sm:'30px',
              xs:'10px'
            },
            marginTop:{
              xl:'-200px',
              lg:'-200px',
              md:'-200px',
              sm:'-220px',
              xs:'-160px',
            }
          }}
        >
          {filterByRating.length > 0
            ? filterByRating.map((item: IProductTypes) => {
                return <ProductItem product={item} key={item.id} />;
              })
            : null}
          {filterByRating.length === 0 && productByPrice.length === 0
            ? products.map((prod: IProductTypes) => {
                return <ProductItem product={prod} key={prod.id} />;
              })
            : null}
        </Box>
      </Box>
    </>
  );
};

export default CategoryFilter;
