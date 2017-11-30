import React, { Component } from 'react';
import { Label } from 'react-bootstrap';
import PropTypes from 'prop-types';

class SkillsList extends Component {
  render() {
    const listItems = this.props.skills.map(skill => (
      <Label bsStyle="info" key ={skill?skill:'111'} style={{ margin: '3px' }}>{skill}</Label>
    ));

    return (
      <div className="SkillsList">
        {this.props.title}
        {listItems}
      </div>
    );
  }
}

SkillsList.propTypes = {
  skills: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
};

export default SkillsList;
