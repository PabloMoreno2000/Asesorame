import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import TutorElement from "../makeTutoringSession/TutorElement";
import SubjectToolbar from "../makeTutoringSession/SubjectToolbar";
import UserCalendar from "../modifyTutorInfo/UserCalendar";
import { API } from "../../scripts/API";

export default class ChooseTutor extends Component {
  state = {
    subjectId: "",
    tutors: null,
    events: [],
    tutorId: null,
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
  };

  setSelectedTutor = async (tutorId) => {
    try {
      const resp = await API.tutoringSessions.getAvailableSessionsWithTutor(
        tutorId
      );
      this.setState({ events: resp.data });
      console.log("RESP" + resp);
    } catch (error) {
      console.log(error);
      return;
    }
  };

  getTutorsJSX = () => {
    if (this.state.tutors) {
      return this.state.tutors.map((tutor) => {
        return (
          <TutorElement
            key={tutor._id}
            tutor={tutor}
            setSelectedTutor={this.setSelectedTutor}
          ></TutorElement>
        );
      });
    } else {
      return <div>Cargando...por favor espere</div>;
    }
  };

  onSelectEvent = ({ begins, ends }) => {
    console.log(begins);
    console.log(ends);
  };

  componentWillMount() {
    const { subjectId } = this.props.location.state;
    this.setState({ subjectId: subjectId });
    this.updateTutors();
  }

  getCalendar = () => {
    if (this.state.events && this.state.events.length > 0) {
      return (
        <UserCalendar
          selectable={false}
          events={this.state.events}
          onSelectSlot={null}
          onSelectEvent={this.onSelectEvent}
        />
      );
    } else {
      return <React.Fragment></React.Fragment>;
    }
  };

  render() {
    console.log(this.state.events);
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
        {this.getCalendar()}
      </div>
    );
  }
}

const btnStyle = {
  marginLeft: "10px",
};
