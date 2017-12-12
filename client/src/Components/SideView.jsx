import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Image } from 'react-bootstrap';
import axios from 'axios';


require('../styles/SideView.css');

class SideView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };
    this.getName = this.getName.bind(this);
  }

  componentWillMount() {
    this.getName();
  }

  getName() {
    axios.get('/get_name')
      .then((response) => {
        // console.log(response);
        if (response.data.success) {
          this.setState({ username: response.data.name });
        } else {
          console.log('Failed to get username'); // eslint-disable-line no-console
        }
      }).catch((error) => {
        console.log('Failed to get username'); // eslint-disable-line no-console
        console.log(error); // eslint-disable-line no-console
      });
  }

  render() {
    return (
      <div className="SideView" style={{ backgroundColor: 'black', opacity: '0.7' }}>
        <div className="ImageAndName">
          <h1 style={{ color: 'white' }}>
            {this.state.username}
          </h1>
          <Image src="https://picsum.photos/200/200/?random" circle style={{ width: '200px', padding: '10px' }} />
        </div >
        <br />
        <br />
        <div style={{ padding: '10px' }} >
          <Button bsStyle="info" onClick={this.props.handleViewProfile} block>Profile</Button>
          <br />
          <Button bsStyle="info" onClick={this.props.handleViewEvent} block>View Events</Button>
          <br />
          <Button bsStyle="info" onClick={this.props.handleCreateEvent} block>Create Event</Button>
        </div>

      </div>
    );
  }
}

SideView.propTypes = {
  handleViewProfile: PropTypes.func.isRequired,
  handleViewEvent: PropTypes.func.isRequired,
  handleCreateEvent: PropTypes.func.isRequired,
};

export default SideView;
