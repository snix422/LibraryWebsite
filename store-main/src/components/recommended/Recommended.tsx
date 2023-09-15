import { Box, Typography } from "@mui/material";
import ProductItem, { IProductTypes } from "../main/ProductItem";
import useFetchFeatured from "../customHook/useEffectFeatured";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../carousel/Slider.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 4, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 767, min: 464 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const Recommended = () => {
  const url: string = `https://bookstore-ce144-default-rtdb.europe-west1.firebasedatabase.app/Products.json`;

  const feature = "recommended";
  const { products } = useFetchFeatured(url, feature);

  return (
    <Box
      className="parent"
      sx={{
        marginTop: "100px",
        backgroundColor: "white",
        borderRadius: "25px",
        paddingTop: "50px",
        paddingBottom: "20px",
        width: { xl: "90vw", lg: "50vw", md: "80vw", sm: "90vw", xs: "95vw" },
        
      }}
    >
      <Typography
        sx={{
          fontFamily: "Montserrat",
          fontWeight: 500,
          fontSize: {
            xl: "40px",
            lg: "40px",
            md: "30px",
            sm: "30px",
            xs: "30px",
          },
          textAlign: "center",
          paddingBottom: "10px",
        }}
      >
        Recomended
      </Typography>
      <Carousel
        responsive={responsive}
        autoPlay={true}
        swipeable={true}
        draggable={true}
        showDots={true}
        infinite={true}
        partialVisible={false}
        dotListClass="custom-dot-list-style"
      >
        {products.map((product: IProductTypes, index: number) => {
          return (
            <div className="slider" key={index}>
              <ProductItem product={product} key={product.id} />
            </div>
          );
        })}
      </Carousel>
    </Box>
  );
};

export default Recommended;
