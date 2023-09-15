import { useState, useEffect } from "react";
import axios from "axios";
import { IProductTypes } from "../main/ProductItem";

const useFetch = (url: string) => {
  const [products, setProducts] = useState<IProductTypes[]>([]);

  useEffect(() => {
    axios.get(url).then(
      (response) => {
        const getData: IProductTypes[] = Object.values(response.data);
        setProducts(getData);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  return { products };
};

export default useFetch;
