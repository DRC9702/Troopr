import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';
import SideView from './SideView';
import BoxView from './BoxView';
import Background from '../Images/bgimg1.jpg';


require('../styles/DashboardView.css');

class DashboardView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userTeams: [],
      userEvents: [],
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
        // console.log(response.data.success);
        if (response.data.success) {
          // console.log(response.data.teams);
          this.setState({ userTeams: response.data.teams });
        } else {
          alert(response.data.message); // eslint-disable-line
        }
      })
      .catch((error) => {
        console.log(error); // eslint-disable-line no-console
      });

    axios.post('/api/show_event', {
    })
      .then((response) => {
        // console.log('show_event successful');
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
          this.setState({ userEvents: newState });
        } else {
          alert(response.data.message); // eslint-disable-line
        }
      })
      .catch((error) => {
        console.log(error); // eslint-disable-line no-console
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
        <div className="BackgroundImg">
          <img src={Background} alt="" style={{ height: '100%', width: '100%' }} />
        </div>
        <SideView
          handleViewProfile={this.handleViewProfile}
          handleViewEvent={this.handleViewEvent}
          handleCreateEvent={this.handleCreateEvent}
        />
        <div id="Content">

          {/* {<h1>Dashboard</h1>} */}

          <Grid fluid style={{ width: '100%' }} >
            <Row className="show-grid" style={{ width: '100%' }}>
              <Col >
                <h1>{''}</h1>
              </Col>
            </Row>
            <Row className="show-grid" style={{ width: '100%' }}>
              <Col md={12} lg={6}>
                <BoxView title="Teams" teams={this.state.userTeams} />
              </Col>
              <Col md={12} lg={6}>
                <BoxView title="Events Hosted" events={this.state.userEvents} />
              </Col>
            </Row>
            {/* <Row className="show-grid" style={{ width: '100%' }}> */}
            {/* <Col md={12} lg={6}> */}
            {/* <BoxView title="NewsFeed" /> */}
            {/* </Col> */}
            {/* <Col md={12} lg={6}> */}
            {/* <BoxView title="Collaborators" /> */}
            {/* </Col> */}
            {/* </Row> */}
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
