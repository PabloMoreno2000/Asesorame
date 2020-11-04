import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import TutorElement from "../makeTutoringSession/TutorElement";
import SubjectToolbar from "../makeTutoringSession/SubjectToolbar";
import { API } from "../../scripts/API";

export default class ChooseTutor extends Component {
  state = {
    subjectId: "",
    tutors: null,
  };

  changeSubject = (id) => {
    this.setState({
      subjectId: id,
    });
  };

  getTutorsBySubject = async (subject) => {
    let tutors = [];
    try {
      tutors = await API.tutors.getAllBySubject(subject);
    } catch (error) {
      console.log(error);
    }
    return tutors.data;
  };

  updateTutors = async () => {
    // In location are the props passed through a Link, as in in Startpage
    const subjectId = this.state.subjectId
      ? this.state.subjectId
      : this.props.location.state.subjectId;
    const tutors = await this.getTutorsBySubject(subjectId);
    this.setState({ tutors });
    console.log(this.state);
  };

  getTutorsJSX = () => {
    if (this.state.tutors) {
      return this.state.tutors.map((tutor) => {
        return <TutorElement key={tutor._id} tutor={tutor}></TutorElement>;
      });
    } else {
      return <div>Cargando...por favor espere</div>;
    }
  };

  componentWillMount() {
    const { subjectId } = this.props.location.state;
    this.setState({ subjectId: subjectId });
    this.updateTutors();
  }

  render() {
    console.log(this.state.tutors);
    return (
      <div className="container">
        <div>
          <SubjectToolbar changeSubject={this.changeSubject}></SubjectToolbar>
          <Button
            variant="primary"
            type="submit"
            style={btnStyle}
            onClick={this.updateTutors}
          >
            Buscar tutores
          </Button>
        </div>
        <h1>Tutores disponibles</h1>
        {this.getTutorsJSX()}
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
