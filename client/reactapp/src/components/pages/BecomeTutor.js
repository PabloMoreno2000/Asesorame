import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
//import Card from "react-bootstrap/Card";
import ModifySubjects from "../modifyTutorInfo/ModifySubjects";
import ModifySchedule from "../modifyTutorInfo/ModifySchedule";
import { API } from "../../scripts/API";

export default class BecomeTutor extends Component {
  state = {
    subjects: null,
    tutor: null,
    events: null,
    link: "",
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  async componentDidMount() {
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
      if (resp.data.tutorInfo.tutoringLink) {
        this.setState({ link: resp.data.tutorInfo.tutoringLink });
      }
    };

    const getAllSessions = async () => {
      let resp = [];
      try {
        resp = await API.tutoringSessions.getSessionsByTutor(
          /* sendUnreserved */ true
        );
      } catch (error) {
        console.log(error);
      }
      this.setState({ events: resp.data }); // CHECAR RESPUESTA A QUE COINCIDA
    };

    await getCurrentUserInfo();
    await getAllSubjects();
    await getAllSessions();
  }

  saveInfo = async () => {
    if (this.state.tutor) {
      try {
        await API.tutors.saveLink(this.state.link);
      } catch (error) {
        alert("Favor de ingresar una liga válida");
        console.log(error);
        return;
      }
    }
    await this.refs.modifySubjects.saveSubjectsToDb();
    await this.refs.modifySchedule.saveSessionsToDb();
    alert("Información guardada exitosamente");
  }; 

  render() {
    if (
      this.state.tutor &&
      this.state.subjects &&
      this.state.events
    ) {
      return (
        <div style={{ width: "60%", margin: "20px auto" }}>
          <div>
            <div style={{ textAlign: "left" }}>
              <h1>Liga para asesorías</h1>
              <p>Pon tu nueva liga para dar asesorías</p>
              <Form.Control
                style={inputStyle}
                value={this.state.link}
                onChange={this.onChange}
                type="text"
                name="link"
                placeholder="Ingrese su liga aquí"
              />
            </div>
            <div style={divLineStyle}></div>
          </div>
          <ModifySubjects
            allSubjects={this.state.subjects}
            tutorSubjects={this.state.tutor.tutorInfo.subjects}
            ref="modifySubjects"
          />
          <ModifySchedule
            tutorId={this.state.tutor._id}
            events={this.state.events}
            ref="modifySchedule"
          />
          <Button variant="primary" style={btnStyle} onClick={this.saveInfo}>
            Guardar información
          </Button>
        </div>
      );
    } else {
      return <div>Cargando...por favor espere</div>;
    }
  }
}

const inputStyle = {
  marginBottom: "20px",
};

const btnStyle = {
  marginLeft: "10px",
};

const divLineStyle = {
  borderTop: "solid 2px #000",
  marginBottom: "20px",
};
