import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import { Link } from "react-router-dom";
import { MdLock } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";

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

    let token = "";
    try {
      let resp = await API.auth.postAuthUser(
        this.state.user,
        this.state.password
      );
      token = resp.data.token;
      localStorage.setItem("x-auth-token", token);
      this.props.updateUser();
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div style={divCenter}>
        <Card className="text-center" style={{ width: "30%" }}>
          <h2 style={{ marginTop: "15px" }}>Iniciar sesión</h2>
          <Card.Body>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>
                      <BsFillPersonFill />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    value={this.state.user}
                    onChange={this.onChange}
                    type="text"
                    name="user"
                    placeholder="Ingrese su usuario"
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>
                      <MdLock />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    value={this.state.password}
                    onChange={this.onChange}
                    type="password"
                    name="password"
                    placeholder="Ingrese su contraseña"
                  />
                </InputGroup>
              </Form.Group>
              <Button
                onClick={this.onSubmit}
                variant="primary"
                style={{ width: "100%", marginBottom: "10px" }}
              >
                <Link style={linkStyle} to="/inicio">
                  Iniciar sesión
                </Link>
              </Button>
            </Form>

            <Card.Footer>
              ¿No tienes cuenta? <Link to="/signUp">Crea una aquí</Link>
            </Card.Footer>
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

const divCenter = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  minHeight: "100vh",
};
