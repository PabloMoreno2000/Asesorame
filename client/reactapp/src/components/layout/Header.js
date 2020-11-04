import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import "../../styles/Header.css";

export default class TutorElement extends Component {
  render() {
    //const tutorInfo = this.props.tutor.tutorInfo;

    return (
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand className="title">Asesórame</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/inicio" className="linkStyle">
            Inicio
          </Nav.Link>
          <Nav.Link href="/detalles" className="linkStyle">
            Features
          </Nav.Link>
          <Nav.Link href="#pricing" className="linkStyle">
            Pricing
          </Nav.Link>
        </Nav>
        <Button variant="outline-light">Cerrar Sesión</Button>
      </Navbar>
    );
  }
}

/*
NoLog --> Asesórame (solo titulo)

Log and tutor --> cerrar sesión, editar perfil (editar nombre, etc), editar disponibilidad (editar materias y schedule), inicio

Log and not-tutor --> cerrar sesión, editar perfil (editar nombre, etc), inicio, hacerse tutor
*/
