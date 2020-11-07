import React, { Component } from "react";
import UserCalendar from "../modifyTutorInfo/UserCalendar";
import Button from "react-bootstrap/Button";
import { API } from "../../scripts/API";

export default class ModifySchedule extends Component {
  state = {
    tutorId: null,
    events: [],
  };

  getInitialEvents = () => {
    this.setState({
      tutorId: this.props.tutorId,
      events: this.props.events,
    });
  };

  addEvent = ({ start, end }) => {
    const newTutoringSession = {
      tutor: this.state.tutorId,
      begins: start,
      ends: end,
      subjectName: "Asesoria",
    };
    this.setState({
      events: [...this.state.events, newTutoringSession],
    });
  };

  removeEvent = ({ begins, ends }) => {
    this.setState({
      events: [
        ...this.state.events.filter(
          (event) => event.begins !== begins && event.ends !== ends
        ),
      ],
    });
  };

  saveSessionsToDb = () => {
    console.log(this.state.events);
    API.tutoringSessions
      .postTutorSessions(this.state.events)
      .then(alert("Espacios creados exitosamente"));
  };

  componentWillMount() {
    this.getInitialEvents();
  }

  render() {
    if (this.state.tutorId) {
      console.log(this.state.events);
      return (
        <div>
          <div style={{ textAlign: "left", marginTop: "30px" }}>
            <h1>Espacios para asesorías</h1>
            <p>
              Utiliza el calendario para crear nuevos espacios de asesoría. Haz
              clic sobre un espacio ya creado para eliminarlo.
            </p>
          </div>
          <UserCalendar
            selectable={true}
            events={this.state.events}
            tutorId={this.state.tutorId}
            addEvent={this.addEvent}
            removeEvent={this.removeEvent}
          />
          <div style={divLineStyle}></div>
          <Button
            variant="primary"
            style={btnStyle}
            onClick={this.saveSessionsToDb}
          >
            Guardar espacios
          </Button>
        </div>
      );
    } else {
      return <div>Cargando...por favor espere</div>;
    }
  }
}

const btnStyle = {
  marginLeft: "10px",
};

const divLineStyle = {
  borderTop: "solid 2px #000",
  marginBottom: "10px",
};
