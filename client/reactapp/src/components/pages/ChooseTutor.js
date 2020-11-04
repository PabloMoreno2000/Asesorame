import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import TutorElement from "../makeTutoringSession/TutorElement";
import { API } from "../../scripts/API";

export default class ChooseTutor extends Component {
  state = {
    subjectId: "",
    tutors: null,
  };

  async componentWillMount() {
    const getTutorsBySubject = async (subject) => {
      let tutors = [];
      try {
        tutors = await API.tutors.getAllBySubject(subject);
      } catch (error) {
        console.log(error);
      }
      return tutors.data;
    };

    // In location are the props passed through a Link, as in in Startpage
    const { subjectId } = this.props.location.state;
    const tutors = await getTutorsBySubject(subjectId);
    this.setState({ subjectId: subjectId });
    this.setState({ tutors });
    console.log(this.state);
  }

  render() {
    console.log(this.state.tutors);
    if (this.state.tutors) {
      return (
        <div className="container">
          {this.state.tutors.map((tutor) => {
            return <TutorElement key={tutor._id} tutor={tutor}></TutorElement>;
          })}
        </div>
      );
    } else {
      return <div>Loading.. please wait!</div>;
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

/*
return this.props.todos.map(todo => (
    <TodoItem key={todo.id} todo={todo} markComplete={this.props.markComplete} deleteTodo={this.props.deleteTodo}/>
  ))
*/
