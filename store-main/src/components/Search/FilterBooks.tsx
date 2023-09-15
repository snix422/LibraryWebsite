import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductItem, { IProductTypes } from "../main/ProductItem";
import Navbar from "../navbar/Navbar";
import { Box, Typography } from "@mui/material";

const FilterBooks = () => {
  const [filteredNameProducts, setFilteredNameProducts] = useState<any>([]);
  const [allBooks, setAllBooks] = useState<any>([]);
  let { bookname } = useParams();
  console.log("useParams", bookname);

  const url: string = `https://bookstore-ce144-default-rtdb.europe-west1.firebasedatabase.app/Products.json`;
  const fetchData = () => {
    axios.get(url).then(
      (response) => {
        const getData = Object.values(response.data);
        setFilteredNameProducts([...getData]);
        setAllBooks([...getData]);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (allBooks.length > 0) {
      console.log("filteredNameProducts", filteredNameProducts);
      const getTheName = allBooks.filter((item: any) =>
        item.name.toLowerCase().includes(bookname?.toLowerCase())
      );

      console.log("getTheName", getTheName);
      setFilteredNameProducts(getTheName);
    }
  }, [bookname]);

  const searchResults = "Search results: " + bookname;

  return (
    <>
      <Navbar />
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          marginTop: "130px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Montserrat",
            fontWeight: 500,
            fontSize: {
              xl: "50px",
              lg: "50px",
              md: "40px",
              sm: "30px",
              xs: "25px",
            },
            textAlign: "center",
            paddingTop: "100px",
            paddingBottom: "40px",
          }}
        >
          {searchResults}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "40px",
            paddingBottom: "40px",
          }}
        >
          {filteredNameProducts.map((prod: IProductTypes) => {
            return <ProductItem product={prod} key={prod.id} />;
          })}
        </Box>
      </Box>
    </>
  );
};
export default FilterBooks;
