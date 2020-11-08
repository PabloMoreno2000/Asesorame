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

  componentWillMount() {
    const getSubjects = async () => {
      let subjects = [];
      try {
        subjects = await API.subjects.getAll();
        this.setState({ subjectList: subjects.data });
        this.filterSubjects();
      } catch (error) {
        console.log(error);
      }
    };
    getSubjects();
  }

  deleteSubjectOption = (id) => {
    const subjectToDelete = [
      ...this.state.subjectList.filter((subject) => {
        return subject._id === id;
      }),
    ];

    this.setState({
      subjectList: [
        ...this.state.subjectList.filter((subject) => subject._id !== id),
      ],
    });
    // Return the deleted subject with all the data
    return subjectToDelete;
  };

  addSubjectOption = (_id, name) => {
    this.setState({
      subjectList: [...this.state.subjectList, { _id, name }],
    });
  };

  filterSubjects = () => {
    if (
      !this.props.subjectsToRemove ||
      this.props.subjectsToRemove.length === 0
    ) {
      return;
    }

    let difference = this.state.subjectList.filter((subject) => {
      return !this.props.subjectsToRemove.includes(subject._id);
    });
    this.setState({ subjectList: difference });
  };

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
  width: "82%",
  margin: "10px",
};

export default SubjectToolbar;
