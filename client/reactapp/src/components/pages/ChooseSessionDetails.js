import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

export default class ChooseSessionDetails extends Component {
  state = {
    subjectId: "",
  };

  componentDidMount() {
    // In location are the props passed through a Link, as in in Startpage
    const { subjectId } = this.props.location.state;
    this.setState({ subjectId: subjectId });
  }

  render() {
    console.log(this.state.subjectId);
    return <div className="container"></div>;
  }
}

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  margin: "auto",
};

const btnStyle = {
  marginLeft: "10px",
};
