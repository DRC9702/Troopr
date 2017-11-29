import React, { Component } from 'react';
import { Button, Grid, Row, Col, Clearfix } from 'react-bootstrap';
import SideView from './SideView';
import BoxView from './BoxView';

require('../styles/DashboardView.css');

const handleViewProfile = () => {
  window.location = '/profile';
};

const handleViewEvent = () => {
  window.location = '/events/$all';
};

const handleCreateEvent = () => {
  window.location = '/create_event';
};

class DashboardView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      savedProfile: ""
    };
  }

  render() {
    return (
      <div className="DashboardView">
        
        <SideView handleViewProfile={handleViewProfile} handleViewEvent={handleViewEvent} handleCreateEvent={handleCreateEvent} />
        <div id="Content">

          {<h1>Dashboard</h1>}
          
          <Grid fluid style={{ width: '100%' }} >
            <Row className="show-grid" style={{ width: '100%' }}>
              <Col md={12} lg={6}>
                <BoxView title="Teams" >
                </BoxView>
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
export default DashboardView;
