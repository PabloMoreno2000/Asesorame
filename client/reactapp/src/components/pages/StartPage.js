import React, { Component } from "react";
import { Link } from "react-router-dom";
import { API } from "../../scripts/API";
import Button from "react-bootstrap/Button";
import SubjectToolbar from "../makeTutoringSession/SubjectToolbar";
import UserCalendar from "../modifyTutorInfo/UserCalendar";
import SessionDetails from "../layout/SessionDetails";

export default class StartPage extends Component {
  state = {
    subjectId: "",
    user: null,
    events: null,
    modalShow: false,
    selectedEventId: null,
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

  onSelectEvent = ({ _id }) => {
    this.setState({ selectedEventId: _id });
    this.handleShow();
  };

  shouldDisplayDetails = () => {
    console.log("I ENTER");
    if (this.state.selectedEventId) {
      console.log(this.state.selectedEventId);
      return (
        <SessionDetails
          show={this.modalShow}
          handleClose={this.handleClose}
          sessionId={this.state.selectedEventId}
        />
      );
    } else {
      return <React.Fragment></React.Fragment>;
    }
  };

  render() {
    console.log(this.state.selectedEventId);
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
