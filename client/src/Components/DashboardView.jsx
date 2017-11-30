import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import SideView from './SideView';
import BoxView from './BoxView';

require('../styles/DashboardView.css');

class DashboardView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      savedProfile: ""
    };
    this.handleViewProfile = this.handleViewProfile.bind(this);
    this.handleViewEvent = this.handleViewEvent.bind(this);
    this.handleCreateEvent = this.handleCreateEvent.bind(this);
  }

  componentDidMount() {
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

  handleViewProfile() {
    this.props.history.push('/profile');
  }

  handleViewEvent() {
    this.props.history.push('/events/$all');
  }

  handleCreateEvent() {
    this.props.history.push('/create_event');
  }

  render() {
    return (
      <div className="DashboardView">
        
        <SideView handleViewProfile={this.handleViewProfile} handleViewEvent={this.handleViewEvent} handleCreateEvent={this.handleCreateEvent} />
        <div id="Content">

          {<h1>Dashboard</h1>}
          
          <Grid fluid style={{ width: '100%' }} >
            <Row className="show-grid" style={{ width: '100%' }}>
              <Col md={12} lg={6}>
                <BoxView title="Teams" />
              </Col>
              <Col md={12} lg={6}>
                <BoxView title="Events" />
              </Col>
            </Row>
            <Row className="show-grid" style={{ width: '100%' }}>
              <Col md={12} lg={6}>
                <BoxView title="NewsFeed" />
              </Col>
              <Col md={12} lg={6}>
                <BoxView title="Collaborators" />
              </Col>
            </Row>
          </Grid>

        </div>
      </div>
    );
  }
}

DashboardView.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default withRouter(DashboardView);
