import React, { Component } from "react";

// Components
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

import { API } from "../../scripts/API";

export default class SignUp extends Component {
  state = {
    user: "",
    password: "",
    passwordConfirm: "",
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async (e) => {
    e.preventDefault();

    const username = this.state.user;
    const password = this.state.password;
    const passwordConfirm = this.state.passwordConfirm;

    if (password !== passwordConfirm) {
      alert("Las constraseñas no coinciden");
      return;
    }

    let token = "";
    try {
      // Save token on local storage
      let resp = await API.users.createUser(username, password);
      token = resp.data.token;
      localStorage.setItem("x-auth-token", token);
    } catch (error) {
      console.log(error);
    }

    // do the call to the server to get user token
  };

  render() {
    return (
      <div style={{ width: "30%", margin: "20px auto" }}>
        <Card className="text-center">
          <h2 style={{ marginTop: "15px" }}>Crear cuenta</h2>
          <Card.Body>
            <Form onSubmit={this.onSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  value={this.state.user}
                  onChange={this.onChange}
                  type="text"
                  name="user"
                  placeholder="Ingrese su usuario"
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Control
                  value={this.state.password}
                  onChange={this.onChange}
                  type="password"
                  name="password"
                  placeholder="Ingrese su contraseña"
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Control
                  value={this.state.passwordConfirm}
                  onChange={this.onChange}
                  type="password"
                  name="passwordConfirm"
                  placeholder="Ingrese su contraseña nuevamente"
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                <Link style={linkStyle} to="/inicio">
                  Crear cuenta
                </Link>
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  margin: "auto",
};
