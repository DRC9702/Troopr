import React, { Component } from 'react';
import ColumnView from './ColumnView';

class DashboardView extends Component {
    constructor(props) {
        super(props);
    }
  render() {
    return (
        <div className="ContentView" style={styles}>
          <h1>Dashboard</h1>
        </div>
      );
  }
}

const styles = {
    backgroundColor: 'orange',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    flexGrow: 1,
};

export default DashboardView;