import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Panel, ListGroup, ListGroupItem, Button, Modal } from 'react-bootstrap';

// require('../styles/SideView.css');

class BoxView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      display: null,
    };

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal(e, index) {
    console.log('ShowModal is clicked');
    console.log(index);
    this.setState({ display: index });
    // this.setState({ selectedEvent: eventId });
  }

  hideModal() {
    this.setState({
      display: null,
    });
  }

  parseArray(str) {
    str = str.substring(1, str.length - 1);
    var ids = str.split(",");
    str = ids.join(", ");
    ids = str.split("\"");
    str = ids.join(" ");
    //str = str.split("\""),join("");
    return str;
  }

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
    else if (this.props.title === "Events") {
      list = this.props.events.map((event, index) => (
        <ListGroup key={event._id}>
          <ListGroupItem>
            <Button type="button" bsStyle="link" onClick={e => this.showModal(e, index)}>
              {event.name}
            </Button>
          </ListGroupItem>
          <Modal show={this.state.display === index} onHide={this.hideModal}>
            <Modal.Header>
              <Modal.Title>Event Detail</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {JSON.stringify(this.props.events) ? (<p>{event.start_date}</p>) : (<p />)}
              <label>End Date</label>
              {JSON.stringify(this.props.events) ? (<p>{event.end_date}</p>) : (<p />)}
              <label>Deadline for Team Registration</label>
              {JSON.stringify(this.props.events) ? (<p>{event.registration_deadline}</p>) : (<p />)}
              <label>Teams</label>
              {JSON.stringify(this.props.events) ? (<p>{this.parseArray(JSON.stringify(event.teams))}</p>) : (<p />)}
              <label>Event Description</label>
              {JSON.stringify(this.props.events) ? (<p>{event.description}</p>) : (<p />)}
              <label>Max Number of Team Members</label>
              {JSON.stringify(this.props.events) ? (<p>{event.max}</p>) : (<p />)}
              <label>Min Number of Team Members</label>
              {JSON.stringify(this.props.events) ? (<p>{event.min}</p>) : (<p />)}
            </Modal.Body>
          </Modal>
        </ListGroup>
      ))
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
