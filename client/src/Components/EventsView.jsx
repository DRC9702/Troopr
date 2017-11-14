import React, { Component } from 'react';
import {Table} from 'react-bootstrap';

class EventsView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="EventsView" style={styles}>
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