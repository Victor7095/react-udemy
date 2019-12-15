import React, { Component } from 'react';
import './App.css';

import Validation from './Validation/Validation';
import Char from './Char/Char';

class App extends Component {
  constructor(){
    super();
    this.state = {
      text: ""
    }
  }

  textChanged = (event) => {
    const text = event.target.value
    this.setState({text})
  }

  removeLetter = (index) => {
    const {text} = this.state;
    const charList = text.split("")
    charList.splice(index, 1)
    this.setState({text: charList.join("")})
  }

  render() {
    const {text} = this.state;

    const charsEl = text.split("").map((item, index)=>{
      return <Char letter={item} key={index} click={()=>this.removeLetter(index)}></Char>
    });

    return (
      <div className="App">
        <input type="text" value={text} onChange={this.textChanged}></input>

        <Validation textLength={text.length}></Validation>

        {charsEl}
      </div>
    );
  }
}

export default App;
