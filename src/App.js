import React, { Component } from 'react';
//import {render} from "react-dom";
import freelancer from './freelancer.svg';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Signup from "./components/Signup";
import Login from "./components/Login";
import Profile from "./components/Profile";
import PostProject from "./components/PostProject";
import Home from "./components/Home";
import {Link} from 'react-router-dom';
import Dashboard from "./components/Dashboard";
import ProjectDetails from "./components/ProjectDetails";
import Employer from "./components/Employer";

class App extends Component {
  render() {
    return (
      <div className="App">
          <BrowserRouter>
              <div>
                  <header className="App-header">
                      <img src={freelancer} className="App-logo" alt="logo" />
                  </header>
                  <h1>
                      <div className="top-right2"><Link to="/signup">Sign Up</Link></div>
                      <div className="top-right1"><Link to="/login">Login</Link></div>
                  </h1>
                  <Route path={`/post-project`} component={PostProject}></Route>
                  <Route path={`/signup`} component={Signup}></Route>
                  <Route path={`/login`} component={Login}></Route>
                  <Route path={`/profile`} component={Profile}></Route>
                  <Route path={`/home`} component={Home}></Route>
                  <Route path={`/dashboard`} component={Dashboard}></Route>
                  <Route path={`/project-details/:project_id`} component={ProjectDetails}></Route>
                  <Route path={`/view-details/:user_id`} component={Employer}></Route>
              </div>
          </BrowserRouter>
      </div>
    );
  }
}

export default App;
