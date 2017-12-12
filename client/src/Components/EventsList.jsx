import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

require('../styles/EventList.css');

class EventsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      display: null,
    };

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.joinEvent = this.joinEvent.bind(this);
  }

  showModal(e, index) {
    e.preventDefault();
    this.setState({ display: index });
  }

  hideModal() {
    this.setState({
      display: null,
    });
  }

  joinEvent(e) {
    // console.log('abc');

    if (e) {
      e.preventDefault();
    }
    // console.log(e.target.value);

    axios.post('/api/join_event', {
      event_id: e.target.value,
    })
      .then((response) => {
        // console.log(response);
        // console.log(response.data.success);

        if (response.data.success) {
          this.props.history.push('/dashboard');
        } else {
          alert(response.data.message); //eslint-disable-line
        }
      })
      .catch((error) => {
        console.log(error); // eslint-disable-line no-console
      });
  }

  render() {
    const listItems = this.props.events.map((event, index) => (
      <tr key={event._id}>
        <th>
          <Button type="button" bsStyle="link" onClick={e => this.showModal(e, index)}>
            {event.name}
          </Button>
        </th>
        <th>{event.startDate}</th>
        <th>{event.endDate}</th>
        <th>{event.registrationDeadline}</th>
        <Modal id="JoinEventModal" show={this.state.display === index} onHide={this.hideModal}>
          <Modal.Header>
            <Modal.Title>{event.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <b>Host</b>
            {JSON.stringify(this.props.events) ? (<p>{event.host.profile.name}</p>) : (<p />)}
            <b>Start Date</b>
            {JSON.stringify(this.props.events) ? (<p>{event.startDate}</p>) : (<p />)}
            <b>End Date</b>
            {JSON.stringify(this.props.events) ? (<p>{event.endDate}</p>) : (<p />)}
            <b>Deadline for Team Registration</b>
            {JSON.stringify(this.props.events) ? (<p>{event.registrationDeadline}</p>) : (<p />)}
            <b>Number of Teams</b>
            {JSON.stringify(this.props.events) ? (<p>{event.teams.length}</p>) :
              (<p />)}
            <b>Event Description</b>
            {JSON.stringify(this.props.events) ? (<p>{event.description}</p>) : (<p />)}
            <b>Max Number of Team Members</b>
            {JSON.stringify(this.props.events) ? (<p>{event.max}</p>) : (<p />)}
            <b>Min Number of Team Members</b>
            {JSON.stringify(this.props.events) ? (<p>{event.min}</p>) : (<p />)}
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="success" type="submit" value={event._id} onClick={this.joinEvent}>
              Join
            </Button>
          </Modal.Footer>
        </Modal>
      </tr>
    ));

    return (
      <tbody>{listItems}</tbody>
    );
  }
}

EventsList.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  events: PropTypes.array.isRequired,
};

export default withRouter(EventsList);
