import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

import { API } from "../../scripts/API";

export default class SignIn extends Component {
  state = {
    user: "",
    password: "",
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    console.log(this.state.user);
    console.log(this.state.password);

    let token = "";
    try {
      let resp = await API.auth.postAuthUser(
        this.state.user,
        this.state.password
      );
      token = resp.data.token;
      localStorage.setItem("x-auth-token", token);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div style={{ width: "30%", margin: "20px auto" }}>
        <Card className="text-center">
          <h2 style={{ marginTop: "15px" }}>Iniciar sesión</h2>
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
              <Button variant="primary" type="submit">
                <Link style={linkStyle} to="/inicio">
                  Iniciar sesión
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
