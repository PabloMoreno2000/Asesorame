import React, { Component } from "react";
import { Link } from "react-router-dom";
import { API } from "../../scripts/API";
import Button from "react-bootstrap/Button";
import SubjectToolbar from "../makeTutoringSession/SubjectToolbar";

export default class StartPage extends Component {
  state = {
    subjectId: "",
    user: null,
  };

  async componentDidMount() {
    this.updateUser();
  }

  changeSubject = (id) => {
    this.setState({
      subjectId: id,
    });
  };

  updateUser = async () => {
    if (localStorage.getItem("x-auth-token")) {
      const user = await API.auth.getAuthUser();
      this.setState({ user: user.data });
    }
  };

  render() {
    console.log(this.state.user);
    if(this.state.user) {
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
                  userId: this.state.user ? this.state.user._id : "",
                },
              }}
            >
              Buscar tutores
            </Link>
          </Button>
        </div>
      );
    } else {
      return <div>Cargando...por favor espere</div>;
    }
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
