import React from "react";
import "./UserOutput.css";

const userOutput = props => {
  const { name } = props;
  return (
    <div className="UserOutput">
      <p>{name}</p>
      <p>Uma descrição</p>
    </div>
  );
};

export default userOutput;
