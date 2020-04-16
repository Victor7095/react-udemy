import React, { Component } from "react";
import { Route, Switch, NavLink } from "react-router-dom";

import Posts from "./Posts/Posts";
import asyncComponent from "../../hoc/asyncComponent";

import "./Blog.css";

const AsyncNewPost = asyncComponent(() => import("./NewPost/NewPost"));

class Blog extends Component {
  state = {
    auth: true
  }
  render() {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li>
                <NavLink to="/posts" exact>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/new-post">New Post</NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <Switch>
          {this.state.auth ? <Route path="/new-post" component={AsyncNewPost} /> : null}
          <Route path="/posts" component={Posts} />          
        </Switch>
      </div>
    );
  }
}

export default Blog;
