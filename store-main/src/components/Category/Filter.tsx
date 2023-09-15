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

const Filter = (props: any) => {
  const { dataProduct, productPrice, ratingFilter } = props;

  const [ratingChecked, setRatingChecked] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });

  function valuetext(value: number) {
    return `${value}°C`;
  }

  const [value, setValue] = useState<number[]>([0, 100]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const getFilteredBooks = () => {
    const minPrice = dataProduct.filter(
      (product: IProductTypes) => product.price > value[0]
    );
    const maxPrice = minPrice.filter(
      (product: IProductTypes) => product.price < value[1]
    );
    productPrice(maxPrice);
    console.log(maxPrice, "maxprice");

    if (ratingChecked[5] === true) {
      const filterCheckbox = maxPrice.filter(
        (prod: IProductTypes) => prod.rating >= 4.5
      );
      ratingFilter(filterCheckbox);
      console.log(filterCheckbox, "filterCheckbox5");
      console.log(maxPrice, "maxPrice in if");
    }
    if (ratingChecked[4] === true) {
      const filterCheckbox2 = maxPrice.filter(
        (prod: IProductTypes) => prod.rating >= 3.5 && prod.rating < 4.5
      );
      ratingFilter(filterCheckbox2);
    }
    if (ratingChecked[3] === true) {
      const filterCheckbox3 = maxPrice.filter(
        (prod: IProductTypes) => prod.rating >= 2.5 && prod.rating < 3.5
      );
      ratingFilter(filterCheckbox3);
      console.log(filterCheckbox3, "filterCheckbox3");
    }
    if (ratingChecked[2] === true) {
      const filterCheckbox4 = maxPrice.filter(
        (prod: IProductTypes) => prod.rating >= 1.5 && prod.rating < 2.5
      );
      ratingFilter(filterCheckbox4);
    }
    if (ratingChecked[1] === true) {
      const filterCheckbox5 = maxPrice.filter(
        (prod: IProductTypes) => prod.rating >= 0.5 && prod.rating < 1.5
      );
      ratingFilter(filterCheckbox5);
      console.log(filterCheckbox5, "filterCheckbox5");
    }
  };

  return (
    <>
      <Box
        sx={{
          width: "100vw",
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap:{
            xl:'80px',
            lg:'70px',
            md:'60px',
            sm:'30px',
            xs:'20px'
          },
          marginBottom:{
            xs:'70px'
          }
        }}
      >
        <Box
          sx={{
            width: {
              xl: "80vw",
              lg: "80vw",
              md: "80vw",
              sm: "90vw",
              xs: "95vw",
            },
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: {
              xl:'100px',
              lg:'100px',
              md:'100px',
              sm:'60px',
              xs:'30px'
            },
            marginTop:{
              xl:'-50px',
              lg:'-50px',
              md:'-50px',
              sm:'0px',
              xs:'0px'
            }
          }}
        >
          <Box
            sx={{
              width: {
                xl: "400px",
                lg: "400px",
                md: "200px",
                sm: "200px",
                xs: "200px",
              },
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              paddingTop: "50px",
              height: "200px",
              position: "relative",
            }}
          >
            <Typography
              sx={{
                
                fontFamily: "Montserrat",
                fontWeight: 500,
                fontSize: "25px",
                textAlign: "center",
              }}
            >
              Filter by price:
            </Typography>
            <Slider
              getAriaLabel={() => ""}
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
            />
            <Box
              sx={{
                width: "400px",
                display: "flex",
                justifyContent: "space-evenly",
                paddingTop: "10px",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Montserrat",
                  fontWeight: 500,
                  fontSize: "25px",
                  textAlign: "center",
                }}
              >
                {value[0] + " €"}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Montserrat",
                  fontWeight: 500,
                  fontSize: "25px",
                  textAlign: "center",
                }}
              >
                {value[1] + " €"}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "column", height: "200px" }}
          >
            <Box sx={{ display: "flex" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={ratingChecked[5]}
                    onClick={() =>
                      setRatingChecked((prev) => {
                        return {
                          ...prev,
                          5: !ratingChecked[5],
                          1: false,
                          2: false,
                          4: false,
                          3: false,
                        };
                      })
                    }
                  />
                }
                label={"5 stars"}
              />
              <Rating
                sx={{
                  padding: "10px 0",
                }}
                name="read-only"
                value={5}
                readOnly
              />
            </Box>
            <Box sx={{ display: "flex" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={ratingChecked[4]}
                    onClick={() =>
                      setRatingChecked((prev) => {
                        return {
                          ...prev,
                          4: !ratingChecked[4],
                          1: false,
                          2: false,
                          3: false,
                          5: false,
                        };
                      })
                    }
                  />
                }
                label={"4 stars"}
              />
              <Rating
                sx={{
                  padding: "10px 0",
                }}
                name="read-only"
                value={4}
                readOnly
              />
            </Box>
            <Box sx={{ display: "flex" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={ratingChecked[3]}
                    onClick={() =>
                      setRatingChecked((prev) => {
                        return {
                          ...prev,
                          3: !ratingChecked[3],
                          1: false,
                          2: false,
                          4: false,
                          5: false,
                        };
                      })
                    }
                  />
                }
                label={"3 stars"}
              />
              <Rating
                sx={{
                  padding: "10px 0",
                }}
                name="read-only"
                value={3}
                readOnly
              />
            </Box>
            <Box sx={{ display: "flex" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={ratingChecked[2]}
                    onClick={() =>
                      setRatingChecked((prev) => {
                        return {
                          ...prev,
                          2: !ratingChecked[2],
                          1: false,
                          3: false,
                          4: false,
                          5: false,
                        };
                      })
                    }
                  />
                }
                label={"2 stars"}
              />
              <Rating
                sx={{
                  padding: "10px 0",
                }}
                name="read-only"
                value={2}
                readOnly
              />
            </Box>
            <Box sx={{ display: "flex" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={ratingChecked[1]}
                    onClick={() =>
                      setRatingChecked((prev) => {
                        return {
                          ...prev,
                          1: !ratingChecked[1],
                          3: false,
                          2: false,
                          4: false,
                          5: false,
                        };
                      })
                    }
                  />
                }
                label={"1 stars"}
              />
              <Rating
                sx={{
                  padding: "10px 0",
                }}
                name="read-only"
                value={1}
                readOnly
              />
            </Box>
          </Box>
        </Box>
        <Button
          onClick={getFilteredBooks}
          sx={{
            marginTop: "20px",
            width: "250px",
            fontFamily: "Montserrat",
            fontWeight: 500,
            fontSize: "15px",
            backgroundColor: "#c75146",
            color: "white",
            "&:hover": {
              backgroundColor: "#ad2e24",
            },
          }}
        >
          Filter
        </Button>
      </Box>
    </>
  );
};

export default Filter;
