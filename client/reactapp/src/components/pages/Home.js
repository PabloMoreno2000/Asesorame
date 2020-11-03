import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import tutoring from "../../assets/tutoringdos.png";

export default class Home extends Component {
  render() {
    return (
      <div>
        <Card className="bg-dark text-white">
          <Card.Img src={tutoring} alt="Card image" />
          <Card.ImgOverlay>
            <Card.Title style={titleStyle}>
              <strong>Asesórame</strong>
            </Card.Title>
            <Card.Text style={phraseStyle}>
              <strong>Encuentra a un tutor</strong>
            </Card.Text>
            <Button variant="primary" type="submit" style={btnStyle}>
              Iniciar sesión
            </Button>
            <br />
            <Button variant="primary" type="submit" style={btnStyle}>
              Crear cuenta
            </Button>
          </Card.ImgOverlay>
        </Card>
      </div>
    );
  }
}

const btnStyle = {
  width: "12%",
  margin: "20px 0",
};

const titleStyle = {
  fontSize: "90px",
  marginTop: "7%",
};

const phraseStyle = {};
