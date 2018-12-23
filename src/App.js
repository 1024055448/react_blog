import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
    } from "react-router-dom";
import Login from './components/Login.js';
import Register from './components/Register.js';
import Home from './components/Home.js';

import logo from './images/logo.svg';

//import './App.css';
//<Link to="/register">注册</Link><br/>
//<Route path="/register" component={Register} />

class App extends Component {
  render() {
    return (
      <Router>
          <div className="App">
            <header className="App-header">
            </header>
            
            <Route exact path="/" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/home" component={Home} />

          </div>
      </Router>
      );
    }
  }

export default App;
