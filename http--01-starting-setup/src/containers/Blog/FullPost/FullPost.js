import React, { Component } from "react";
import axios from "axios";

import "./FullPost.css";

class FullPost extends Component {
  state = {
    loadedPost: null
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate() {
    this.loadData();
  }

  loadData(){
    const { id } = this.props.match.params;
    const { loadedPost } = this.state;
    if (id && (!loadedPost || (loadedPost && loadedPost.id != id))) {
      axios.get(`/posts/${id}`)
      .then(res => {
        this.setState({loadedPost: res.data});
      });
    }
  }

  deletePostHandler = () => {
    const { loadedPost } = this.state;
    axios.delete(`/posts/${loadedPost.id}`)
    .then(res => {
      console.log(res);
    });
  }

  render() {
    const { loadedPost } = this.state;
    const { id } = this.props.match.params;
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
