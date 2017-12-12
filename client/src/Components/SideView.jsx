import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Image } from 'react-bootstrap';

require('../styles/SideView.css');


class SideView extends Component {
  render() {
    return (
      <div className="SideView" style={{ backgroundColor: 'grey' }}>
        <div className="ImageAndName">
          <p>
            Username
          </p>
          <Image src="https://picsum.photos/200/200/?random" circle style={{ width: '200px' }} />
        </div >
        <br />
        <br />
        <Button bsStyle="info" onClick={this.props.handleViewProfile} block>Profile</Button>
        <Button bsStyle="info" onClick={this.props.handleViewEvent} block>View Events</Button>
        <Button bsStyle="info" onClick={this.props.handleCreateEvent} block>Create Event</Button>

      </div>
    );
  }
}

SideView.propTypes = {
  handleViewProfile: PropTypes.func.isRequired,
  handleViewEvent: PropTypes.func.isRequired,
  handleCreateEvent: PropTypes.func.isRequired,
};

export default SideView;
