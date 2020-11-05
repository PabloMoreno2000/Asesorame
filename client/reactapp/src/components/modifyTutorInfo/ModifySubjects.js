import React, { Component } from "react";
import SubjectToolbar from "../makeTutoringSession/SubjectToolbar";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import SubjectTag from "./SubjectTag";
import { API } from "../../scripts/API";

export default class ModifySubjects extends Component {
  state = {
    selectedSubjectIds: [],
    subjectIdNameDict: null,
    selectedId: "",
  };

  processProps = () => {
    let tempDict = {};
    this.props.allSubjects.forEach((subject) => {
      tempDict[subject._id] = subject.name;
    });
    // Initially selectedSubjects are the ones the tutor has (sent in props)
    this.setState({
      selectedSubjectIds: this.props.tutorSubjects,
      subjectIdNameDict: tempDict,
    });
  };

  saveSubjectsToDb = () => {
    API.tutors.updateSubjects(this.state.selectedSubjectIds).then();
  };

  componentDidMount() {
    this.deleteSubjects();
    this.processProps();
  }

  changeSubject = (subjectId) => {
    this.setState({
      selectedId: subjectId,
    });
  };

  // Add it to the tutor's subjects list and remove it from all the options
  addSelectedSubject = () => {
    if (this.state.selectedId) {
      this.setState({
        selectedSubjectIds: [
          ...this.state.selectedSubjectIds,
          this.state.selectedId,
        ],
        selectedId: null,
      });
      this.refs.toolbar.deleteSubjectOption(this.state.selectedId);
    }
  };

  // Remove from tutor's subjects and add it to all the options
  deleteChosenSubject = (id, subjectName) => {
    this.setState({
      selectedSubjectIds: [
        ...this.state.selectedSubjectIds.filter(
          (subjectId) => subjectId !== id
        ),
      ],
    });
    this.refs.toolbar.addSubjectOption(id, subjectName);
  };

  //Delete tutor's subjects from dropdown
  deleteSubjects = () => {
    this.state.selectedSubjectIds.forEach((subjectId) => {
      this.refs.toolbar.deleteSubjectOption(subjectId);
    });
  };

  // Get all subjects
  // Get subjects from tutor
  // Display tutor's subject on one space
  // Display remaining subjects on a dropdown

  render() {
    console.log(this.state.selectedSubjectIds);
    if (this.state.subjectIdNameDict) {
      return (
        <div>
          <div style={{ textAlign: "left" }}>
            <h1>Materias</h1>
            <p>Agrega las materias para las cuales podrás impartir asesorías</p>
          </div>
          <SubjectToolbar
            ref="toolbar"
            changeSubject={this.changeSubject}
            subjectsToRemove={this.state.selectedSubjectIds}
          ></SubjectToolbar>
          <Button
            variant="primary"
            type="submit"
            style={btnStyle}
            onClick={this.addSelectedSubject}
          >
            Agregar materia
          </Button>
          <h3 style={{ textAlign: "left" }}>Materias seleccionadas</h3>
          <div style={tagContainerStyle}>
            {this.state.selectedSubjectIds.map((subjectId) => {
              return (
                <SubjectTag
                  deleteSubject={this.deleteChosenSubject}
                  subjectName={this.state.subjectIdNameDict[subjectId]}
                  subjectId={subjectId}
                ></SubjectTag>
              );
            })}
          </div>
          <div style={divLineStyle}></div>
          <Button
            variant="primary"
            style={btnStyle}
            onClick={this.saveSubjectsToDb}
          >
            Guardar materias
          </Button>
        </div>
      );
    } else {
      this.processProps();
      return <div>Cargando...por favor espere</div>;
    }
  }
}

const tagContainerStyle = {
  margin: "10px",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "left",
};

const btnStyle = {
  marginLeft: "10px",
};

const divLineStyle = {
  borderTop: "solid 2px #000",
  marginBottom: "10px",
};
