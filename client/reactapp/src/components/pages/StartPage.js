import React, { Component } from "react";
import { Link } from "react-router-dom";
import { API } from "../../scripts/API";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import SubjectToolbar from "../makeTutoringSession/SubjectToolbar";
import UserCalendar from "../modifyTutorInfo/UserCalendar";
//import SessionDetails from "../layout/SessionDetails";

export default class StartPage extends Component {
  state = {
    subjectId: "",
    user: null,
    events: null,
    modalShow: false,
    selectedEventId: null,
    selectedEvent: null,
  };

  calendarStyle = {
    height: "550px",
    margin: "30px",
  };

  async componentDidMount() {
    const updateUser = async () => {
      if (localStorage.getItem("x-auth-token")) {
        const user = await API.auth.getAuthUser();
        this.setState({ user: user.data });
      }
    };

    const getAllSessions = async () => {
      let resp = [];
      try {
        resp = await API.tutoringSessions.getSessionsByTutor(
          /* sendUnreserved */ false
        );
      } catch (error) {
        console.log(error);
      }
      this.setState({ events: resp.data }); // CHECAR RESPUESTA A QUE COINCIDA
    };

    await updateUser();
    await getAllSessions();
  }

  handleShow = () => {
    this.setState({ modalShow: true });
  };

  handleClose = () => {
    this.setState({ modalShow: false });
  };

  changeSubject = (id) => {
    this.setState({
      subjectId: id,
    });
  };

  onSelectEvent = async ({ _id }) => {
    let resp = {};
    try {
      resp = await API.tutoringSessions.getDetails(_id);

      this.setState({
        selectedEventId: _id,
        selectedEvent: resp.data,
      });
      this.handleShow();
    } catch (error) {
      console.log(error);
      return;
    }
  };

  getUserFullName(user) {
    if (user && user.tutorInfo && user.tutorInfo.name)
      return (
        user.tutorInfo.name.firstName + " " + user.tutorInfo.name.firstSurname
      );

    return "No reservado";
  }

  getMinutesDifference = (before, after) => {
    const timeUnit = 6e4;
    before = new Date(before);
    after = new Date(after);
    let difference = (after - before) / timeUnit;
    const remainder = (after - before) % timeUnit;
    if (remainder >= timeUnit / 2) {
      difference++;
    }
    return difference + " minutos";
  };

  formatDate = (date) => {
    date = new Date(date);
    let year = date.getFullYear();
    let month = months[date.getMonth()];
    let day = date.getDate();
    if (day < 10) {
      day = `0${day}`;
    }
    return `${day}/${month}/${year}`;
  };

  displayModal = (props) => {
    const selectedEvent = this.state.selectedEvent;
    if (selectedEvent) {
      return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header style={modalHeaderStyle} closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Detalles de asesoría
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={detailsStyle}>
              <p>
                <span style={labelStyle}>Tutor: </span>
                <span>{this.getUserFullName(selectedEvent.tutor)}</span>
              </p>
              <p>
                <span style={labelStyle}>Estudiante: </span>
                <span>{this.getUserFullName(selectedEvent.student)}</span>
              </p>
              <p>
                <span style={labelStyle}>Materia: </span>
                <span>{selectedEvent.subjectName}</span>
              </p>
              <p>
                <span style={labelStyle}>Fecha de inicio: </span>
                <span>{this.formatDate(selectedEvent.begins)}</span>
              </p>
              <p>
                <span style={labelStyle}>Duracion: </span>
                <span>
                  {this.getMinutesDifference(
                    selectedEvent.begins,
                    selectedEvent.ends
                  )}
                </span>
              </p>

              <p>
                <span style={labelStyle}>Link de asesoría: </span>
                <span>{selectedEvent.tutor.tutorInfo.tutoringLink}</span>
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.handleClose}>
              Cancelar
            </Button>
            <Button onClick={this.handleClose}>Confirmar</Button>
          </Modal.Footer>
        </Modal>
      );
    } else {
      return <React.Fragment></React.Fragment>;
    }
  };

  shouldDisplayDetails = () => {
    return this.displayModal({
      show: this.state.modalShow,
      onHide: this.handleClose,
    });
  };

  render() {
    console.log(this.state.selectedEvent);
    if (this.state.user && this.state.events) {
      return (
        <div className="container">
          <SubjectToolbar changeSubject={this.changeSubject}></SubjectToolbar>
          <Button variant="primary" type="submit" style={btnStyle}>
            <Link
              style={linkStyle}
              to={{
                pathname: "/reservar",
                state: {
                  subjectId: this.state.subjectId,
                  userId: this.state.user ? this.state.user._id : "",
                },
              }}
            >
              Buscar tutores
            </Link>
          </Button>
          <UserCalendar
            selectable={false}
            events={this.state.events}
            onSelectSlot={null}
            onSelectEvent={this.onSelectEvent}
            calendarStyle={this.calendarStyle}
          />
          {this.shouldDisplayDetails()}
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

const detailsStyle = {
  fontSize: "20px",
};

const modalHeaderStyle = {
  background: "#007BFF",
  color: "#FFF",
};

const labelStyle = {
  fontWeight: "bold",
};

const months = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];
