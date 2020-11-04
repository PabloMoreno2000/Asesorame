import React, { Component } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import img from "../../assets/profile.png";
export default class TutorElement extends Component {
  render() {
    const tutorInfo = this.props.tutor.tutorInfo;

    return (
      <div style={containerStyle}>
        <Card border="primary">
          <Card.Body>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img src={img} style={userImageStyle} alt="Tutor"></img>
              <div style={{ marginLeft: "15px" }}>
                <Card.Title style={{ textAlign: "left", color: "#6598CB" }}>
                  {tutorInfo.name.firstName + " " + tutorInfo.name.firstSurname}
                </Card.Title>
                <Card.Text style={{ textAlign: "left" }}>
                  {`Asesorias impartidas: ${tutorInfo.sessionsGiven}`}
                </Card.Text>
                <Button variant="primary" style={btnStyle}>
                  <Link style={linkStyle} to="/inicio">
                    Seleccionar
                  </Link>
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

const containerStyle = {
  width: "50rem",
  margin: "20px auto",
};

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  margin: "auto",
};

const btnStyle = {
  float: "left",
};

const userImageStyle = {
  width: "75px",
  height: "75px",
};
