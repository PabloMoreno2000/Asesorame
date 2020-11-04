import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { API } from "../../scripts/API";

export default class ChooseSessionDetails extends Component {
  state = {
    subjectId: "",
    tutors: [],
  };

  async componentDidMount() {
    const getTutorsBySubject = async (subject) => {
      let tutors = [];
      try {
        tutors = await API.tutors.getAllBySubject(subject);
      } catch (error) {
        console.log(error);
      }
      return tutors.data;
    };

    // In location are the props passed through a Link, as in in Startpage
    const { subjectId } = this.props.location.state;
    const tutors = await getTutorsBySubject(subjectId);
    this.setState({ subjectId: subjectId });
    this.setState({ tutors });
    console.log(this.state);
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
