import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
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
    modalShow: false,
    selectedEventId: null,
  };

  calendarStyle = {
    height: "500px",
    margin: "30px",
  };

  displayModal = (props) => {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Confirma tu asesoría
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Haz click en aceptar para separar el espacio seleccionado.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.onModalConfirm}>Confirmar</Button>
        </Modal.Footer>
      </Modal>
    );
  };

  onModalConfirm = async () => {
    if (this.state.selectedEventId && this.state.subjectId) {
      await API.tutoringSessions.scheduleWithStudent(
        this.state.selectedEventId,
        this.state.subjectId
      );
      this.setState({
        events: [
          ...this.state.events.filter(
            (event) => event._id !== this.state.selectedEventId
          ),
        ],
        selectedEventId: null,
      });
      alert("Asesoria reservada exitosamente");
    } else {
      alert("Error, favor de intentar de nuevo");
    }
    this.setModalShow(false);
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
    let tutors = await this.getTutorsBySubject(subjectId);
    tutors = tutors.filter(
      (tutor) => tutor._id !== this.props.location.state.userId
    );
    this.setState({ tutors: tutors });
  };

  setSelectedTutor = async (tutorId) => {
    try {
      const resp = await API.tutoringSessions.getAvailableSessionsWithTutor(
        tutorId
      );
      this.setState({ events: resp.data });
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

  setModalShow = (show) => {
    this.setState({ modalShow: show });
  };

  onSelectEvent = ({ _id }) => {
    this.setState({ selectedEventId: _id });
    this.setModalShow(true);
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
          calendarStyle={this.calendarStyle}
        />
      );
    } else {
      return <React.Fragment></React.Fragment>;
    }
  };

  render() {
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
        {this.displayModal({
          show: this.state.modalShow,
        })}
      </div>
    );
  }
}

const btnStyle = {
  marginLeft: "10px",
};
