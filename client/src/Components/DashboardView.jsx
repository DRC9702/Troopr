import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import SideView from './SideView';
import BoxView from './BoxView';
import axios from 'axios';


require('../styles/DashboardView.css');

class DashboardView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      savedProfile: "",
      userTeams: []
    };
    this.handleViewProfile = this.handleViewProfile.bind(this);
    this.handleViewEvent = this.handleViewEvent.bind(this);
    this.handleCreateEvent = this.handleCreateEvent.bind(this);
  }

  componentDidMount() {
    axios.post('/api/user_teams', {
    })
      .then((response) => {
        // console.log(response.data);
        console.log(response.data.success);
        if (response.data.success) {
          console.log(response.data.teams);
          this.setState({userTeams: response.data.teams});
        } else {
          console.log('teams query failed');
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
                <BoxView title="Teams" teams={this.state.userTeams}/>
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
