import React, { Component } from "react";

// Styling
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Components
//import SignIn from "./components/pages/SignIn";
import SignUp from "./components/pages/SignUp";
//import Home from "./components/pages/Home";

class App extends Component {
  state = {};

  render() {
    return (
      <div className="App">
        <SignUp />
      </div>
    );
  }
}

export default App;
