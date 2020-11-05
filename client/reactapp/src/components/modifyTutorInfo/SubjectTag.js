import React, { Component } from "react";
import PropTypes from "prop-types";
import { IoIosCloseCircleOutline as CloseIcon } from "react-icons/io";

import "../../styles/SubjectTag.css";

export default class SubjectTag extends Component {
  render() {
    const id = this.props.subjectId;
    const name = this.props.subjectName;
    return (
      <span className="tagStyle">
        {name}
        <CloseIcon
          size={16}
          className="iconStyle"
          onClick={this.props.deleteSubject.bind(this, id, name)}
        />
      </span>
    );
  }
}

SubjectTag.propTypes = {
  subjectName: PropTypes.string.isRequired,
  subjectId: PropTypes.string.isRequired,
};
