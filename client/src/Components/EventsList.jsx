import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

class EventsList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const listItems = this.props.events.map(event => (
      <tr key={event._id}>
        <th>
          <Button type="button" bsStyle="link" onClick={this.props.showModal}>
            {event.name}
          </Button>
        </th>
        <th>{event.start_date}</th>
        <th>{event.end_date}</th>
        <th>{event.registration_deadline}</th>
      </tr>));
    return (
      <tbody>{listItems}</tbody>
    );
  }
}

EventsList.propTypes = {
  showModal: PropTypes.func.isRequired,
};

export default EventsList;
