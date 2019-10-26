import React from "react";
import "./UserInput.css";

const userInput = props => {
  const { changed, name } = props;
  const style = {
    border: "none",
    borderBottom: "2px solid blue",
    color: "#666666",
    textDecoration: "none"
  };
  return <input style={style} onChange={changed} value={name} type="text" />;
};

export default userInput;
