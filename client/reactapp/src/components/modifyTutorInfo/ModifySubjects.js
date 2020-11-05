import React, { Component } from "react";
import SubjectToolbar from "../makeTutoringSession/SubjectToolbar";
import Button from "react-bootstrap/Button";
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
      });
      this.refs.toolbar.deleteSubjectOption(this.state.selectedId);
    }
  };

  //Delete tutor's subjects from dropdown
  deleteSubjects = () => {
    this.state.selectedSubjectIds.map((subjectId) => {
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
        <div className="container">
          <div>
            {this.state.selectedSubjectIds.map((subjectId) => {
              return <p>{this.state.subjectIdNameDict[subjectId]}</p>;
            })}
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
        </div>
      );
    } else {
      this.processProps();
      return <div>Cargando...por favor espere</div>;
    }
  }
}

const btnStyle = {
  marginLeft: "10px",
};
