import React, { Component } from 'react';
import {Table} from 'react-bootstrap';
import axios from 'axios';

class EventsView extends Component {
  constructor(props) {
    super(props);
    const value = new Date().toISOString();
    this.state = {
        events: []
    };
    this.getEvents = this.getEvents.bind(this);
  }

    getEvents = function(e) {
      // Submit form via jQuery/AJAX
              //console.log(data);
              axios.post('/api/search_event', {
                  query: ""
              })
              .then((response) => {
                  console.log(response);
                  console.log(response.data.success);
                  // console.log(response.data.user);
              })
              .catch((error) => {
                  console.log(error);
              });
          }

    render() {
        return (
            <div className="EventsView" style={styles} onLoad={this.getEvents}>
              <Table striped bordered condensed hover>
                <thead>
                  <tr>
                    <th>Event Name</th>
                    <th>Event Start Date</th>
                    <th>Event End Date</th>
                    <th>Registraion Close Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Placeholder</td>
                    <td>00/00/00</td>
                    <td>00/00/00</td>
                    <td>00/00/00</td>
                  </tr>
                </tbody>
              </Table>
            </div>
        );
    }
};

const styles = {
    backgroundColor: 'orange',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    flexGrow: 1,
};

export default EventsView;