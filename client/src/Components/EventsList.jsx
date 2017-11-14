import React, { Component } from 'react';

class EventsList extends Component {
  render() {
    const listItems = this.props.events.map(event =>
      (<tr key={event._id}>
        <th>{event.name}</th>
        <th>{event.start_date}</th>
        <th>{event.end_date}</th>
        <th>{event.registration_deadline}</th>
      </tr>));
    return (
      <tbody>{listItems}</tbody>
    );
  }
}

export default EventsList;
