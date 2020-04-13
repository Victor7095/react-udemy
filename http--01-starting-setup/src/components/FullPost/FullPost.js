import React, { Component } from "react";
import axios from "axios";

import "./FullPost.css";

class FullPost extends Component {
  state = {
    loadedPost: null
  }

  componentDidUpdate() {
    const { id } = this.props;
    const { loadedPost } = this.state;
    if (id && (!loadedPost || (loadedPost && loadedPost.id !== id))) {
      axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(res => {
        this.setState({loadedPost: res.data});
      });
    }
  }

  deletePostHandler = () => {
    const { loadedPost } = this.state;
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${loadedPost.id}`)
    .then(res => {
      console.log(res);
    });
  }

  render() {
    const { loadedPost } = this.state;
    const { id } = this.props;
    let post = <p style={{ textAlign: "center" }}>Please select a Post!</p>;
    if (id) {
      post = <p style={{ textAlign: "center" }}>Loading!</p>;
    }
    if (loadedPost) {
      post = (
        <div className="FullPost">
          <h1>{loadedPost.title}</h1>
          <p>{loadedPost.body}</p>
          <div className="Edit">
            <button onClick={this.deletePostHandler} className="Delete">Delete</button>
          </div>
        </div>
      );
    }
    return post;
  }
}

export default FullPost;
