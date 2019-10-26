import React, { Component } from "react";
import UserInput from "./UserInput/UserInput";
import UserOutput from "./UserOutput/UserOutput";
import "./App.css";

class App extends Component {
  state = {
    users: [
      { name: "Victor" },
      { name: "Jorge" },
      { name: "Paulo" },
      { name: "Lucas" }
    ]
  };

  changeNameHandler = event => {
    this.setState({
      users: [
        { name: event.target.value },
        { name: "Jorge" },
        { name: "Paulo" },
        { name: "Lucas" }
      ]
    });
  };

  render() {
    const { users } = this.state;
    return (
      <div className="App">
        <UserInput
          changed={this.changeNameHandler}
          name={users[0].name}
        ></UserInput>
        <UserOutput name={users[0].name}></UserOutput>
        <UserOutput name={users[1].name}></UserOutput>
        <UserOutput name={users[2].name}></UserOutput>
        <UserOutput name={users[3].name}></UserOutput>
      </div>
    );
  }
}

export default App;
