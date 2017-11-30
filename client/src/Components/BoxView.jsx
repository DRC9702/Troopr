import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';

// require('../styles/SideView.css');

class BoxView extends Component {



  render() {
    let list;

    if (this.props.title === "Teams") {
      list = this.props.teams.map((team) => (
        <ListGroup key={team._id}>
          <ListGroupItem href={'/team/' + team.event._id}>{team.members.map((member) => (
            <p key={member._id}>{member.profile.name}</p>
          ))}</ListGroupItem>
        </ListGroup>
      ));
    }

    return (
      <div className="BoxView">
        <Panel header={this.props.title} bsStyle="primary">
          {list}
        </Panel>
      </div>
    );
  }
}

BoxView.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default BoxView;
