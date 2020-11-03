import React, { Component } from "react";

import { Dropdown } from "semantic-ui-react";

import { API } from "../../scripts/API";

export class SubjectToolbar extends Component {
  state = {
    subjectList: [],
    selectedSubject: "",
  };

  changeSubjectSelection = (e, { value }) => {
    this.setState({ selectedSubject: value });
    this.props.changeSubject(value);
  };

  componentDidMount() {
    const getSubjects = async () => {
      let subjects = [];
      try {
        subjects = await API.subjects.getAll();
        this.setState({ subjectList: subjects.data });
      } catch (error) {
        console.log(error);
      }
    };
    getSubjects();
  }

  render() {
    const subjectOptions = this.state.subjectList.map((subject) => {
      return {
        key: subject._id,
        value: subject._id,
        text: subject.name,
      };
    });
    return (
      <Dropdown
        placeholder="Selecciona una materia"
        search
        selection
        scrolling
        name="selectedSubject"
        onChange={this.changeSubjectSelection}
        value={this.state.selectedSubject}
        options={subjectOptions}
        style={dropDownStyle}
      />
    );
  }
}

const dropDownStyle = {
  width: "50%",
  margin: "10px auto",
};

export default SubjectToolbar;
