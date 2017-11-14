import React, { Component } from 'react';

class EventsList extends Component {
  // componentWillReceiveProps(nextProps) {
  //   console.log(nextProps.events);
  //   const newState = nextProps;
  //   for (let i = 0; i < newState.events.length; i++) {
  //     const tokens = newState.events[i].start_date.split('/')[0].split('-');
  //     const formattedDate = `${tokens[1] }/${tokens[2] }/${tokens[0]}`;
  //     newState.events[i].start_date = formattedDate;
  //   }
  //   this.setState(newState);
  // }

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
