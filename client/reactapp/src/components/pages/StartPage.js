import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import SubjectToolbar from "../makeTutoringSession/SubjectToolbar";

export default class StartPage extends Component {
  state = {
    subjectId: "",
  };

  changeSubject = (id) => {
    this.setState({
      subjectId: id,
    });
  };

  render() {
    return (
      <div className="container">
        <SubjectToolbar changeSubject={this.changeSubject}></SubjectToolbar>
        <Button variant="primary" type="submit" style={btnStyle}>
          <Link
            style={linkStyle}
            to={{
              pathname: "/detalles",
              state: {
                subjectId: this.state.subjectId,
              },
            }}
          >
            Buscar tutores
          </Link>
        </Button>
      </div>
    );
  }
}

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  margin: "auto",
};

const btnStyle = {
  marginLeft: "10px",
};
