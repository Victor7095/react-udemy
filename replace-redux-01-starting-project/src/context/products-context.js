import React, { useState } from "react";

export const ProductsContext = React.createContext({
  products: [],
  toogleFav: (id) => {},
});

export default (props) => {
  const [products, setProducts] = useState([
    {
      id: "p1",
      title: "Red Scarf",
      description: "A pretty red scarf.",
      isFavorite: false,
    },
    {
      id: "p2",
      title: "Blue T-Shirt",
      description: "A pretty blue t-shirt.",
      isFavorite: false,
    },
    {
      id: "p3",
      title: "Green Trousers",
      description: "A pair of lightly green trousers.",
      isFavorite: false,
    },
    {
      id: "p4",
      title: "Orange Hat",
      description: "Street style! An orange hat.",
      isFavorite: false,
    },
  ]);

  const toogleFavorite = (productId) => {
    setProducts(prevProducts => {
      const prodIndex = prevProducts.findIndex((p) => p.id === productId);
      const newFavStatus = !prevProducts[prodIndex].isFavorite;
      const updatedProducts = [...products];
      updatedProducts[prodIndex] = {
        ...updatedProducts[prodIndex],
        isFavorite: newFavStatus,
      };
      return updatedProducts;
    });
  };

  return (
    <ProductsContext.Provider value={{ products, toogleFav: toogleFavorite }}>
      {props.children}
    </ProductsContext.Provider>
  );
};
