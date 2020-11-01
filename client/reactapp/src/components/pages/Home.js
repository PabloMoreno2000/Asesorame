import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import logo from "../../logo.svg";
export default class Home extends Component {
  render() {
    return (
      <div>
        <Card className="bg-dark text-white">
          <Card.Img src={logo} alt="Card image" />
          <Card.ImgOverlay>
            <Card.Title>Asesórame</Card.Title>
            <Card.Text>Encuantra a un tutor</Card.Text>
          </Card.ImgOverlay>
        </Card>
      </div>
    );
  }
}
