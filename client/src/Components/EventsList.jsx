import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
require('../styles/EventList.css');

class EventsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      display: false,
    };

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal() {
    console.log('ShowModal is clicked');
    this.setState({ display: true });
    // this.setState({ selectedEvent: eventId });
  }

  hideModal() {
    this.setState({
      display: false,
    });
  }

  joinEvent(event, e) {
    if(e) e.preventDefault();

    axios.post('/api/join_event', {
      event: event,
    })
      .then((response) => {
        console.log(response);
        console.log(response.data.success);

        if (response.data.success) {
          window.location = '/dashboard';
        } else {
          alert('join event failed');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const listItems = this.props.events.map(event => (

        <tr key={event._id}>
          <th>
            <Button type="button" bsStyle="link" onClick={this.showModal}>
              {event.name}
            </Button>
          </th>
          <th>{event.start_date}</th>
          <th>{event.end_date}</th>
          <th>{event.registration_deadline}</th>
          <Modal show={this.state.display} onHide={this.hideModal}>
            <Modal.Header>
              <Modal.Title>Event Detail</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <label>Host</label>
              {JSON.stringify(this.props.events) ? (<p>{event.host.profile.name}</p>) : (<p></p>)}
              <label>Start Date</label>
              {JSON.stringify(this.props.events) ? (<p>{event.start_date}</p>) : (<p></p>)}
              <label>End Date</label>
              {JSON.stringify(this.props.events) ? (<p>{event.end_date}</p>) : (<p></p>)}
              <label>Deadline for Team Registration</label>
              {JSON.stringify(this.props.events) ? (<p>{event.registration_deadline}</p>) : (<p></p>)}
              <label>Teams</label>
              {JSON.stringify(this.props.events) ? (<p>{JSON.stringify(event.teams)}</p>) : (<p></p>)}
              <label>Event Description</label>
              {JSON.stringify(this.props.events) ? (<p>{event.description}</p>) : (<p></p>)}
              <label>Max Number of Team Members</label>
              {JSON.stringify(this.props.events) ? (<p>{event.max}</p>) : (<p></p>)}
              <label>Min Number of Team Members</label>
              {JSON.stringify(this.props.events) ? (<p>{event.min}</p>) : (<p></p>)}
            </Modal.Body>
            <Modal.Footer>
              <Button bsStyle="success" type="submit" value="Login" onClick={(event) => this.joinEvent()}>
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
  // showModal: PropTypes.func.isRequired,
};

export default EventsList;
