import React, { Component } from 'react';
import ContentView from './ContentView';
import SkillsList from './SkillsList';

class ProfileView extends Component {
  render() {
    return (
      <div className="ProfileView" style={styles}>
        <p>Name</p>
        <SkillsList />
        <p>Bio</p>
        <p>Links</p>
      </div>
    );
  }
}

const styles = {
    backgroundColor: 'orange',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    flexGrow: 1,
};

export default ProfileView;
