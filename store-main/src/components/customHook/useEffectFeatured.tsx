import { useState, useEffect } from "react";
import axios from "axios";
import { IProductTypes } from "../main/ProductItem";

const useFetchFeatured = (url: string, feature: string | any) => {
  const [products, setProducts] = useState<IProductTypes[]>([]);

  useEffect(() => {
    axios.get(url).then(
      (response) => {
        const getData: IProductTypes[] = Object.values(response.data);

        setProducts(getData);
        let featuredProduct: IProductTypes[] = [];
        if (feature === "recommended") {
          featuredProduct = getData.filter((item) => item.recommended === true);
        } else if (feature === "promotion") {
          featuredProduct = getData.filter(
            (item: IProductTypes) => item.promotion === true
          );
        } else if (feature === "announcement") {
          featuredProduct = getData.filter(
            (item: IProductTypes) => item.announcement === true
          );
        } else {
          featuredProduct = getData.filter(
            (item: IProductTypes) => item.id == feature
          );
        }

        setProducts(featuredProduct);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  return { products };
};

export default useFetchFeatured;
