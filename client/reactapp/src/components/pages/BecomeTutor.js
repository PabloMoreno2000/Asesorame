import React, { Component } from "react";
//import Button from "react-bootstrap/Button";
//import Form from "react-bootstrap/Form";
//import Card from "react-bootstrap/Card";
import ModifySubjects from "../modifyTutorInfo/ModifySubjects";
import { Link } from "react-router-dom";
import { API } from "../../scripts/API";

export default class BecomeTutor extends Component {
  state = {
    subjects: null,
    tutor: null,
  };

  async componentWillMount() {
    const getAllSubjects = async () => {
      let resp = [];
      try {
        resp = await API.subjects.getAll();
      } catch (error) {
        console.log(error);
      }
      this.setState({ subjects: resp.data });
    };

    const getCurrentUserInfo = async () => {
      let resp = [];
      try {
        resp = await API.auth.getAuthUser();
      } catch (error) {
        console.log(error);
      }
      this.setState({ tutor: resp.data });
    };

    await getCurrentUserInfo();
    await getAllSubjects();
  }

  render() {
    if (this.state.tutor && this.state.subjects) {
      return (
        <div style={{ width: "30%", margin: "20px auto" }}>
          <ModifySubjects
            allSubjects={this.state.subjects}
            tutorSubjects={this.state.tutor.tutorInfo.subjects}
          />
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

/*
for (let quiz of responseJSON){
  $("#quizList").append(`<li class='quiz'>
                <h4>${quiz.quizTitle}</h4>
                <p><span>By: </span> ${quiz.userName}</p>
                <p><span>Tags: </span><span class="tag"> ${quiz.quizTags.join('</span><span class="tag">')}</span></p>
                <button class='takeQuizBtn waves-effect waves-light btn' id='${quiz._id}'>Take quiz!</button>
                </li>`); 
}

return this.props.todos.map(todo => (
    <TodoItem key={todo.id} todo={todo} markComplete={this.props.markComplete} deleteTodo={this.props.deleteTodo}/>
    ))
*/
