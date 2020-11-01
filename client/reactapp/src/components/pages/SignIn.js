import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
export default class SignIn extends Component {
  state = {
    user: "",
    password: "",
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.user);
    console.log(this.state.password);
  };

  render() {
    return (
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Form onSubmit={this.onSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                value={this.state.user}
                onChange={this.onChange}
                type="text"
                name="user"
                placeholder="Ingrese su usuario"
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                value={this.state.password}
                onChange={this.onChange}
                type="password"
                name="password"
                placeholder="Ingrese su contraseña"
              />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}
