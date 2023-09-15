import { createContext } from "react";
import { useState } from "react";

const CardContext = createContext();

export function CardProvider({ children }) {
  const [items, setItems] = useState([]);
  const [newPrice, setNewPrice] = useState(0);

  const addToCard = (id, photo, name, price) => {
    const existItem = items.find((item) => item.id === id);

    if (existItem) {
      existItem.quantity++;
    } else {
      setItems([
        ...items,
        { id: id, photo: photo, name: name, price: price, quantity: 1 },
      ]);
    }
    setNewPrice(newPrice + price);
  };

  const removeSingle = (id) => {
    const existItem = items.find((item) => item.id === id);

    if (existItem.quantity === 1) {
      const itemAfterRemove = items.filter((item) => item.id !== id);
      setItems(itemAfterRemove);
      console.log("itemAfterRemove", itemAfterRemove);
    } else {
      existItem.quantity--;
    }

    setNewPrice(newPrice - existItem.price);
  };

  const removeAll = () => {
    setItems([]);
  };

  return (
    <>
      <CardContext.Provider
        value={{ addToCard, removeSingle, removeAll, items, newPrice }}
      >
        {children}
      </CardContext.Provider>
    </>
  );
}

export default CardContext;
