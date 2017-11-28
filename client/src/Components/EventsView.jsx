import React, { Component } from 'react';
import { Modal, Table, Button, FormControl, Form } from 'react-bootstrap';
import axios from 'axios';
import EventsList from './EventsList';


// const styles = {
//   backgroundColor: 'orange',
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'space-around',
//   alignItems: 'center',
//   flexWrap: 'wrap',
//   flexGrow: 1,
// };

class EventsView extends Component {
  constructor(props) {
    super(props);
    const value = new Date().toISOString();
    this.state = {
      events: [],
      display: false,
      selectedEvent: '',
    };


    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    const _this = this;
    console.log(this.props);
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
        // console.log(response.data);
        console.log(response.data.success);
        if (response.data.success) {
          console.log(response.data.events);
          const newState = response.data.events;
          for (let i = 0; i < newState.length; i += 1) {
            // reformatting dates
            let tokens = newState[i].start_date.split('T')[0].split('-');
            let formattedDate = `${tokens[1]}/${tokens[2]}/${tokens[0]}`;
            newState[i].start_date = formattedDate;

            tokens = newState[i].end_date.split('T')[0].split('-');
            formattedDate = `${tokens[1]}/${tokens[2]}/${tokens[0]}`;
            newState[i].end_date = formattedDate;

            tokens = newState[i].registration_deadline.split('T')[0].split('-');
            formattedDate = `${tokens[1]}/${tokens[2]}/${tokens[0]}`;
            newState[i].registration_deadline = formattedDate;
          }
          console.log(newState)
          _this.setState({ events: newState });
          // _this.setState({ events: response.data.events });

          console.log(this.state.events[0])

        } else {
          console.log('events query failed');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="EventsView" >
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Event Start Date</th>
              <th>Event End Date</th>
              <th>Registraion Close Date</th>
            </tr>
          </thead>
          <EventsList events={this.state.events}/>
        </Table>
      </div>
    );
  }
}

export default EventsView;
