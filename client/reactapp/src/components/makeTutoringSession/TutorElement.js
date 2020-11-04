import React, { Component } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

export default class TutorElement extends Component {
  render() {
    const tutorInfo = this.props.tutor.tutorInfo;

    return (
      <Card border="primary" style={{ width: "50rem", margin: "auto" }}>
        <Card.Body>
          <Card.Title style={{ textAlign: "left", color: "#6598CB" }}>
            {tutorInfo.name.firstName + " " + tutorInfo.name.firstSurname}
          </Card.Title>
          <Card.Text style={{ textAlign: "left" }}>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
    );
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
