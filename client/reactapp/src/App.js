import React, { Component } from "react";
import "./App.css";
import SignIn from "./components/pages/SignIn";
import "bootstrap/dist/css/bootstrap.min.css";
class App extends Component {
  state = {};

  render() {
    return (
      <div className="App">
        <SignIn />
      </div>
    );
  }
}

export default App;
