import React, { Component } from "react";
//import { Link } from "react-router-dom";
import SubjectToolbar from "../makeTutoringSession/SubjectToolbar";

export default class Home extends Component {
  state = {
    subjectId: "",
  };

  changeSubject = (id) => {
    this.setState({
      subjectId: id,
    });
  };

  render() {
    console.log(this.state.subjectId);
    return <SubjectToolbar changeSubject={this.changeSubject}></SubjectToolbar>;
  }
}
