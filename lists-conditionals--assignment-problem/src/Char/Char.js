import React from 'react';
import './Char.css';

const char = props => {
    const {letter, click} = props;
    return (
      <div onClick={click} className="Char">
          {letter}
      </div>
    );
}

export default char;
