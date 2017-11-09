import React, { Component } from 'react';
import ColumnView from './ColumnView';
import { Button, ButtonGroup } from 'react-bootstrap';
import {Link} from 'react-router-dom';


class DashboardView extends Component {
    constructor(props) {
        super(props);
    }

  render() {
    return (
        <div className="DashboardView" style={styles}>
          <h1>Dashboard</h1>
          <h2>Hello! {this.props.username}</h2>
          <div className="well" style={wellStyles}>
            <Button bsStyle="primary" bsSize="large" block>
              <Link to='/profile'>
                View Profile
              </Link>
            </Button>
            <Button bsStyle="primary" bsSize="large" block>View Event</Button>
            <Button bsStyle="primary" bsSize="large" block>Create Event</Button>
          </div>
        </div>
      );
  }
}

const styles = {
    backgroundColor: 'orange',
    display: 'flex', 
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    flexGrow: 1,
};

const wellStyles = { width: 400, margin: '0 auto 10px' };



export default DashboardView;