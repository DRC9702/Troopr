import React, { Component } from 'react';
import { Label } from 'react-bootstrap';

class SkillsList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const listItems = this.props.skills.map(skill => (
      <Label bsStyle="info" bsSize="large">{skill}</Label>
    ));

    return (
      <div className="SkillsList" >
        <label>{this.props.title} </label>
        {listItems}
      </div>
    );
  }
}

SkillsList.propTypes = {
  // showModal: PropTypes.func.isRequired,
};

export default SkillsList;
