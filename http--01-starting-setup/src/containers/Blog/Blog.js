import React, { Component } from 'react';
import { Route, NavLink } from "react-router-dom";

import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';
import FullPost from './FullPost/FullPost';

import './Blog.css';

class Blog extends Component {

  render() {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li><NavLink to="/" exact>Home</NavLink></li>
              <li><NavLink to="/new-post">New Post</NavLink></li>
            </ul>
          </nav>
        </header>
        <Route path="/" component={Posts} exact />
        <Route path="/new-post" component={NewPost} />
        <Route path="/post/:id" component={FullPost} />
      </div>
    );
  }
}

export default Blog;
