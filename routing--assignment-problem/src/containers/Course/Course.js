import React, { Component } from "react";

class Course extends Component {
  render() {
    const { match, location } = this.props;
    const { id } = match.params;
    const { title } = location.state ?? " ";
    return (
      <div>
        <h1>{title}</h1>
        <p>You selected the Course with ID: { id }</p>
      </div>
    );
  }
}

export default Course;
