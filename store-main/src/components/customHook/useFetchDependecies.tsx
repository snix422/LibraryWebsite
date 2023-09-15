import { useState, useEffect } from "react";
import axios from "axios";
import { IProductTypes } from "../main/ProductItem";

const useFetchDependecies = (url: string, category: string) => {
  const [products, setProducts] = useState<IProductTypes[]>([]);

  useEffect(() => {
    axios.get(url).then(
      (response) => {
        const getData: IProductTypes[] = Object.values(response.data);

        setProducts(getData);

        const filteredCategory = getData.filter(
          (item: IProductTypes) => item.Category === category
        );
        setProducts(filteredCategory);
      },
      (error: IProductTypes) => {
        console.log(error);
      }
    );
  }, [category]);

  return { products };
};

export default useFetchDependecies;
