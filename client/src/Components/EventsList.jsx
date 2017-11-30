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
      eventJoined:""
    };

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.joinEvent = this.joinEvent.bind(this);
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

  joinEvent(e) {
    console.log('abc');

    if (e) {
      e.preventDefault();
    }
    console.log(e.target.value);

    axios.post('/api/join_event', {
      event_id: e.target.value,
    })
      .then((response) => {
        console.log(response);
        console.log(response.data.success);

        if (response.data.success) {
          this.props.history.push('/dashboard');
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
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
        <th>{event.start_date}</th>
        <th>{event.end_date}</th>
        <th>{event.registration_deadline}</th>
        <Modal id="JoinEventModal" show={this.state.display === index} onHide={this.hideModal}>
          <Modal.Header>
            <Modal.Title>Event Detail</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label>Host</label>
            {JSON.stringify(this.props.events) ? (<p>{event.host.profile.name}</p>) : (<p />)}
            <label>Start Date</label>
            {JSON.stringify(this.props.events) ? (<p>{event.start_date}</p>) : (<p />)}
            <label>End Date</label>
            {JSON.stringify(this.props.events) ? (<p>{event.end_date}</p>) : (<p />)}
            <label>Deadline for Team Registration</label>
            {JSON.stringify(this.props.events) ? (<p>{event.registration_deadline}</p>) : (<p />)}
            <label>Teams</label>
            {JSON.stringify(this.props.events) ? (<p>{JSON.stringify(event.teams)}</p>) : (<p />)}
            <label>Event Description</label>
            {JSON.stringify(this.props.events) ? (<p>{event.description}</p>) : (<p />)}
            <label>Max Number of Team Members</label>
            {JSON.stringify(this.props.events) ? (<p>{event.max}</p>) : (<p />)}
            <label>Min Number of Team Members</label>
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
  // showModal: PropTypes.func.isRequired,
};

export default withRouter(EventsList);
