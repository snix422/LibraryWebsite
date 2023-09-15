import React from "react";
import "./App.css";
import { CardProvider } from "./context/CardContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import LogIn from "./components/login/LogIn";
import SignUp from "./components/signup/SignUp";
import Checkout from "./components/checkout/Checkout";
import { FavouriteProvider } from "./context/FavouriteContext";
import Favourites from "./components/favourites/Favourites";
import ProductPage from "./components/main/ProductPage";
import FilterBooks from "./components/Search/FilterBooks";
import { CategoryProvider } from "./context/CategoryContext";
import CategoryFilter from "./components/Category/CategoryFilter";

function App() {
  const routes = [
    { path: "/", element: <Layout /> },
    { path: "/login", element: <LogIn /> },
    { path: "/signup", element: <SignUp /> },
    { path: "/checkout", element: <Checkout /> },
    { path: "/favourite", element: <Favourites /> },
    { path: "/product/:id", element: <ProductPage /> },
    { path: "/biography", element: <CategoryFilter /> },
    { path: "/business", element: <CategoryFilter /> },
    { path: "/computer", element: <CategoryFilter /> },
    { path: "/careers", element: <CategoryFilter /> },
    { path: "/search/:bookname", element: <FilterBooks /> },
  ];

  return (
    <FavouriteProvider>
      <CardProvider>
        <CategoryProvider>
          <BrowserRouter>
            <Routes>
              {routes.map((route) => (
                <Route path={route.path} element={route.element} />
              ))}
            </Routes>
          </BrowserRouter>
        </CategoryProvider>
      </CardProvider>
    </FavouriteProvider>
  );
}

export default App;
