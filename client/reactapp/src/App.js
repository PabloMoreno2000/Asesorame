import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// Styling
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Components
import SignIn from "./components/pages/SignIn";
import SignUp from "./components/pages/SignUp";
import Home from "./components/pages/Home";

class App extends Component {
  state = {};

  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Home}></Route>
          <Route path="/signUp" component={SignUp}></Route>
          <Route path="/signIn" component={SignIn} />
        </div>
      </Router>
    );
  }
}

export default App;
