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

  updateUser = () => {
    this.refs.header.updateUser();
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Header ref="header"></Header>
          <Route exact path="/" component={Home}></Route>
          <Route
            path="/signUp"
            render={(props) => {
              return <SignUp updateUser={this.updateUser} />;
            }}
          />
          <Route
            path="/signIn"
            render={(props) => {
              return <SignIn updateUser={this.updateUser} />;
            }}
          />
          <Route path="/inicio" component={StartPage} />
          <Route path="/detalles" component={ChooseTutor} />
        </div>
      </Router>
    );
  }
}

export default App;
