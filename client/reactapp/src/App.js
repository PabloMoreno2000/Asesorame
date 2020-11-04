import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Styling
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "semantic-ui-css/semantic.min.css";

// Components
import SignIn from "./components/pages/SignIn";
import SignUp from "./components/pages/SignUp";
import Home from "./components/pages/Home";
import StartPage from "./components/pages/StartPage";
import ChooseTutor from "./components/pages/ChooseTutor";
import Header from "./components/layout/Header";

class App extends Component {
  state = {};

  render() {
    return (
      <Router>
        <Header></Header>
        <div className="App">
          <Route exact path="/" component={Home}></Route>
          <Route path="/signUp" component={SignUp}></Route>
          <Route path="/signIn" component={SignIn} />
          <Route path="/inicio" component={StartPage} />
          <Route path="/detalles" component={ChooseTutor} />
        </div>
      </Router>
    );
  }
}

export default App;
