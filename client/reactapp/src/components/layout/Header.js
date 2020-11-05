import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { API } from "../../scripts/API";
import { Link } from "react-router-dom";
import "../../styles/Header.css";

export default class Header extends Component {
  state = {
    user: null,
  };

  async componentWillMount() {
    this.updateUser();
  }

  updateUser = async () => {
    if (localStorage.getItem("x-auth-token")) {
      const user = await API.auth.getAuthUser();
      this.setState({ user });
    }
  };

  signOut = () => {
    localStorage.removeItem("x-auth-token");
    this.setState({ user: null });
  };

  configureLinks = () => {
    if (!this.state.user) {
      return <React.Fragment></React.Fragment>;
    }
    if (this.state.user.isTutor) {
      //desplegar links para el usuario tipo tutor
      return (
        <React.Fragment>
          <Nav className="mr-auto">
            <Nav.Link href="/inicio" className="linkStyle">
              Inicio
            </Nav.Link>
            <Nav.Link href="/perfil" className="linkStyle">
              Perfil
            </Nav.Link>
            <Nav.Link href="" className="linkStyle">
              Panel de Tutor
            </Nav.Link>
          </Nav>
          <Button variant="outline-light" onClick={this.signOut}>
            <Link className="btnLinkStyle" to="/">
              Cerrar Sesión
            </Link>
          </Button>
        </React.Fragment>
      );
    } else {
      //desplegar links para el usuario tipo alumno
      return (
        <React.Fragment>
          <Nav className="mr-auto">
            <Nav.Link href="/inicio" className="linkStyle">
              Inicio
            </Nav.Link>
            <Nav.Link href="/perfil" className="linkStyle">
              Perfil
            </Nav.Link>
            <Nav.Link href="" className="linkStyle">
              Convertirse en tutor
            </Nav.Link>
          </Nav>
          <Button onClick={this.signOut} variant="outline-light">
            <Link className="btnLinkStyle" to="/">
              Cerrar Sesión
            </Link>
          </Button>
        </React.Fragment>
      );
    }
  };

  render() {
    //const tutorInfo = this.props.tutor.tutorInfo;
    return (
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand className="title">Asesórame</Navbar.Brand>
        {this.configureLinks()}
      </Navbar>
    );
  }
}

/*
NoLog --> Asesórame (solo titulo)

Log and tutor --> cerrar sesión, editar perfil (editar nombre, etc), editar disponibilidad (editar materias y schedule), inicio

Log and not-tutor --> cerrar sesión, editar perfil (editar nombre, etc), inicio, hacerse tutor
*/
