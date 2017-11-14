import React, { Component } from 'react';
// import ColumnView from './ColumnView';
import { Button } from 'react-bootstrap';


class DashboardView extends Component {

  constructor(props) {
      super(props);
      this.state = {
          savedProfile: ""
      };
  }

  handleViewProfile = function() {
      window.location = "/profile";
  }.bind(this);

  handleViewEvent = function() {
      window.location = "/events";
  }.bind(this);

  handleCreateEvent = function() {
      window.location = "/create_event";
  }.bind(this);

  render() {
    return (
      <div className="DashboardView" style={styles}>
        <h1>Dashboard</h1>
        <h2>Hello! {this.props.username}</h2>
        <div className="well" style={wellStyles}>
          <Button bsStyle="primary" bsSize="large" onClick={this.handleViewProfile} block>View Profile</Button>
          <Button bsStyle="primary" bsSize="large" onClick={this.handleViewEvent} block>View Event</Button>
          <Button bsStyle="primary" bsSize="large" onClick={this.handleCreateEvent} block>Create Event</Button>
        </div>
      </div>
    );
  }
}

const styles = {
  backgroundColor: 'orange',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  flexGrow: 1,
};

const wellStyles = { width: 400, margin: '0 auto 10px' };


export default DashboardView;
