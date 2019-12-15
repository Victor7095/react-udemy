import React from 'react';
import './Validation.css';

const validation = props => {
    let {textLength} = props;

    const textStatus = textLength >= 5 ? "Text long enough" : "Text too short";

    return (
      <div>
        <p>{textStatus}</p>
      </div>
    );
}

export default validation;
