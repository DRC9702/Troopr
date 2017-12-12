import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import PropTypes from 'prop-types';
import EventsList from './EventsList';
import Background from '../Images/bgimg1.jpg';

require('../styles/EventsView.css');

class EventsView extends Component {
  constructor(props) {
    super(props);
    // const value = new Date().toISOString();
    this.state = {
      events: [],
      // display: false,
      // selectedEvent: '',
    };
  }

  componentDidMount() {
    // console.log(this.props);
    let key = '';
    if (this.props.match.params.searchKey !== '$all') {
      key = this.props.match.params.searchKey;
    }
    // Submit form via jQuery/AJAX
    // console.log(data);
    axios.post('/api/search_event', {
      query: key,
    })
      .then((response) => {
        // console.log(response.data.success);
        if (response.data.success) {
          // console.log(response.data.events);
          const newState = response.data.events;
          for (let i = 0; i < newState.length; i += 1) {
            // reformatting dates
            let tokens = newState[i].startDate.split('T')[0].split('-');
            let formattedDate = `${tokens[1]}/${tokens[2]}/${tokens[0]}`;
            newState[i].startDate = formattedDate;

            tokens = newState[i].endDate.split('T')[0].split('-');
            formattedDate = `${tokens[1]}/${tokens[2]}/${tokens[0]}`;
            newState[i].endDate = formattedDate;

            tokens = newState[i].registrationDeadline.split('T')[0].split('-');
            formattedDate = `${tokens[1]}/${tokens[2]}/${tokens[0]}`;
            newState[i].registrationDeadline = formattedDate;
          }
          // console.log(newState);
          this.setState({ events: newState });
          // _this.setState({ events: response.data.events });

          // console.log(this.state.events[0]);
        } else {
          alert(response.data.message); //eslint-disable-line
        }
      })
      .catch((error) => {
        console.log(error); // eslint-disable-line no-console
      });
  }

  render() {
    return (
      <div className="EventsView" >
        <div className="BackgroundImg" >
          <img src={Background} alt="" style={{ height: '100%', width: '100%' }} />
        </div>
        <h1 style={{ zIndex: '2' }}>Events</h1>
        <Table striped bordered condensed hover style={{ zIndex: '2' }}>
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Event Start Date</th>
              <th>Event End Date</th>
              <th>Registraion Close Date</th>
            </tr>
          </thead>
          <EventsList events={this.state.events} />
        </Table>
      </div>
    );
  }
}

EventsView.propTypes = {
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default EventsView;
