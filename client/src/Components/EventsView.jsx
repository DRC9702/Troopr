import React, { Component } from 'react';
import { Modal, Table, Button, FormControl, Form } from 'react-bootstrap';
import axios from 'axios';
import EventsList from './EventsList';


const styles = {
  backgroundColor: 'orange',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  alignItems: 'center',
  flexWrap: 'wrap',
  flexGrow: 1,
};

class EventsView extends Component {
  constructor(props) {
    super(props);
    const value = new Date().toISOString();
    this.state = {
      events: [],
      display: false,
    };

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
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
          const newState = response.data.events;
          for (let i = 0; i < newState.length; i++) {
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
          _this.setState({ events: newState });
        } else {
          console.log('events query failed');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  showModal() {
    console.log('ShowModal is clicked');
    this.setState({ display: true });
  }

  hideModal() {
    this.setState({
      display: false,
    });
  }

  // joinEvent() {
  //
  // }

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
          <EventsList events={this.state.events} showModal={this.showModal} />
        </Table>

        <Modal show={this.state.display} onHide={this.hideModal}>
          <Modal.Header>
            <Modal.Title>EventDetail</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Resume:</p>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="success" type="submit" value="Login" onClick={this.joinEvent}>
              Join
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default EventsView;
