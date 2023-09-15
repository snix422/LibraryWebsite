import { createContext, useState } from "react";

const CategoryContext = createContext();

export function CategoryProvider({ children }) {
  const [category, setCategory] = useState("Computer");

  const declareCategory = (clickedCategory) => {
    setCategory(clickedCategory);
  };

  return (
    <>
      <CategoryContext.Provider value={{ declareCategory, category }}>
        {children}
      </CategoryContext.Provider>
    </>
  );
}
export default CategoryContext;
