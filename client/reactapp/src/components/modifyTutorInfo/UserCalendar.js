import React, { Component } from "react";

import { Calendar, Views } from "react-big-calendar";
import localizer from "react-big-calendar/lib/localizers/moment";
import moment from "moment";
import "moment/locale/es-mx";

import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("es-mx");
console.log(moment().format());

const momentLocalizer = localizer(moment);

export default class UserCalendar extends Component {
  state = {
    selectable: false,
    // When slots are created
    onSelectSlot: () => {},
    // When a user clicks a existing slot
    onSelectEvent: () => {},
  };

  componentWillMount() {
    const selectable = this.props.selectable;
    if (selectable) {
      this.setState({
        // Create and add new event in parent component
        onSelectSlot: ({ start, end }) => {
          this.props.onSelectSlot({ start, end });
        },
        // Delete event in parent component
        onSelectEvent: ({ begins, ends }) => {
          this.props.onSelectEvent({ begins, ends });
        },
        selectable: true,
      });
    } else {
      this.setState({
        onSelectEvent: ({ begins, ends }) => {
          this.props.onSelectEvent({ begins, ends });
        },
        selectable: false,
      });
    }
  }

  render() {
    return (
      <div>
        <Calendar
          style={calendarStyle}
          events={this.props.events}
          localizer={momentLocalizer}
          views={["month", "week", "day"]}
          defaultView={Views.WEEK}
          min={new Date(2019, 11, 0, 8, 0, 0)}
          max={new Date(2020, 11, 0, 23, 59, 59)}
          selectable={this.props.selectable}
          onSelectSlot={this.state.onSelectSlot}
          onSelectEvent={this.state.onSelectEvent}
          titleAccessor="subjectName"
          startAccessor="begins"
          endAccessor="ends"
          messages={{
            today: "Hoy",
            previous: "Anterior",
            next: "Siguiente",
            month: "Mes",
            week: "Semana",
            day: "Día",
          }}
        />
      </div>
    );
  }
}

const calendarStyle = {
  height: "500px",
  margin: "30px",
};

/*
Usos del calendario:

*Tutor abra nuevos espacios de asesoria
  Eventos -> Todas las TS donde usuario es tutor

  onSelectSlot -> 
    agregar el nuevo evento al arreglo del tutor, al guardar (boton aparte) se guarda al arreglo en DB

  onSelectEvent ->
    borrar el evento si no hay un alumno registrado ya

* Alumno reserve una asesoria
  Eventos -> Todas las TS donde usuario (a separar asesoría con) es tutor, y no tienen estudiante
  
  onSelectSlot -> 
    no habilitado

  onSelectEvent ->
    debe actualizar la tutoringSession para que tenga student, userSeparated, subjectId


* Alumno y tutor ven su calendario
  Eventos -> Todas las TS donde el usuario sea tutor o alumno

  onSelectSlot -> 
    no habilitado

  onSelectEvent ->
    debe abrir una nueva pagina con los detalles de la TS seleccionada
*/
