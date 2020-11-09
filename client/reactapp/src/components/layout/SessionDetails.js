import React, { Component } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Button";
import { API } from "../../scripts/API";

/*
<Jumbotron>
  <h1>Hello, world!</h1>
  <p>
    This is a simple hero unit, a simple jumbotron-style component for calling
    extra attention to featured content or information.
  </p>
  <p>
    <Button variant="primary">Learn more</Button>
  </p>
</Jumbotron>
*/

/*

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

 <Button variant="primary" onClick={handleShow}>
    Launch demo modal
</Button>


<Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
    </Modal.Header>
    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
        Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
        Save Changes
        </Button>
    </Modal.Footer>
</Modal>
*/

export default class SessionDetails extends Component {
  state = {
    sessionId: null,
    modalShow: true,
  };

  componentWillMount() {
    this.setState({
      sessionId: this.props.sessionId,
    });
  }

  deleteSession = async () => {
    await API.tutoringSessions.this.props.handleClose();
  };

  render() {
    if (this.state.sessionId) {
      return (
        <Modal show={this.props.show} onHide={this.props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.handleClose}>
              Close
            </Button>
            <Button variant="danger" onClick={this.deleteSession}>
              Cancelar asesoría
            </Button>
          </Modal.Footer>
        </Modal>
      );
    } else {
      return <React.Fragment></React.Fragment>;
    }
  }
}
