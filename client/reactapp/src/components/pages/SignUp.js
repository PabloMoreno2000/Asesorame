import React, { Component } from "react";
import { withRouter } from "react-router-dom";

// Components
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { MdLock } from "react-icons/md";
import { BsFillPersonFill, BsFillPersonLinesFill } from "react-icons/bs";
import InputGroup from "react-bootstrap/InputGroup";
import { API } from "../../scripts/API";

class SignUp extends Component {
  state = {
    user: "",
    password: "",
    passwordConfirm: "",
    firstName: "",
    firstSurname: "",
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async (e) => {
    e.preventDefault();

    const username = this.state.user;
    const password = this.state.password;
    const passwordConfirm = this.state.passwordConfirm;
    const firstName = this.state.firstName;
    const firstSurname = this.state.firstSurname;

    if (password !== passwordConfirm) {
      alert("Las constraseñas no coinciden");
      return;
    }

    if (
      this.state.user === "" ||
      this.state.password === "" ||
      this.state.firstName === "" ||
      this.state.firstSurname === ""
    ) {
      alert("Favor de llenar todos los campos");
      return;
    }

    let token = "";
    try {
      // Save token on local storage
      let resp = await API.users.createUser(
        username,
        password,
        firstName,
        firstSurname
      );
      token = resp.data.token;
      localStorage.setItem("x-auth-token", token);
      this.props.updateUser();
      this.props.history.push("/inicio");
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div style={divCenter}>
        <Card
          style={{ width: "40%", margin: "20px auto" }}
          className="text-center"
        >
          <h1 style={{ marginTop: "15px" }}>Crear cuenta</h1>
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

              <Form.Row>
                <Form.Group as={Col} controlId="">
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text>
                        <BsFillPersonLinesFill />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      value={this.state.firstName}
                      onChange={this.onChange}
                      type="text"
                      name="firstName"
                      placeholder="Ingrese su nombre"
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group as={Col} controlId="">
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text>
                        <BsFillPersonLinesFill />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      value={this.state.firstSurname}
                      onChange={this.onChange}
                      type="text"
                      name="firstSurname"
                      placeholder="Ingrese su apellido"
                    />
                  </InputGroup>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formBasicPassword">
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

                <Form.Group as={Col} controlId="formBasicPassword">
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text>
                        <MdLock />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      value={this.state.passwordConfirm}
                      onChange={this.onChange}
                      type="password"
                      name="passwordConfirm"
                      placeholder="Ingrese su contraseña nuevamente"
                    />
                  </InputGroup>
                </Form.Group>
              </Form.Row>
              <Button
                onClick={this.onSubmit}
                variant="primary"
                style={{ width: "100%", marginBottom: "10px" }}
              >
                Crear cuenta
              </Button>
            </Form>

            <Card.Footer>
              ¿Ya tienes cuenta? <Link to="/signIn">Inicia sesión aquí</Link>
            </Card.Footer>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

const divCenter = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  minHeight: "85vh",
};
// To define this.props.history
export default withRouter(SignUp);
