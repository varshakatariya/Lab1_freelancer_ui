import React, { Component } from 'react';
//import {render} from "react-dom";
import feelancer from './feelancer-LOGO.svg';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Signup from "./components/Signup";
import Login from "./components/Login";
import UserProfile from "./components/UserProfile";
import PostProject from "./components/PostProject";
import Home from "./components/Home";
import {Link} from 'react-router-dom';
import Dashboard from "./components/Dashboard";

class App extends Component {
  render() {
    return (
      <div className="App">
          <BrowserRouter>
              <div>
                  <header className="App-header">
                      <img src={feelancer} className="App-logo" alt="logo" />
                  </header>
                  <h1 className="App-title">
                      <div><Link to="/signup">Sign Up</Link></div>
                      <div><Link to="/login">Login</Link></div>
                  </h1>
                  <Route path={`/post-project`} component={PostProject}></Route>
                  <Route path={`/signup`} component={Signup}></Route>
                  <Route path={`/login`} component={Login}></Route>
                  <Route path={`/profile`} component={UserProfile}></Route>
                  <Route path={`/home`} component={Home}></Route>
                  <Route path={`/dashboard`} component={Dashboard}></Route>
              </div>
          </BrowserRouter>
      </div>
    );
  }
}

export default App;
