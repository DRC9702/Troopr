import React, { Component } from 'react';
import ColumnView from './ColumnView';
import DashboardView from './DashboardView';
import ProfileView from './ProfileView';

class ContentView extends Component {
  constructor(props) {
    super(props);
    this.state = {viewProfile: false};
    this.toProfileHandler = this.toProfileHandler.bind(this);
  }

  toProfileHandler(e) {
    this.setState({
      viewProfile: true,
    })
  }

  render() {
    if(this.state.viewProfile)
      return(
        <div className="ContentViewer" style={styles}>
          <ProfileView />
        </div>
      );
    else
      return(
        <div className="ContentViewer" style={styles}>
          <DashboardView viewProfile={this.state.viewProfile} toProfileHandler = {this.toProfileHandler} />
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

export default ContentView;
