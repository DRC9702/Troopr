import React, { Component } from 'react';

class SkillsList extends Component {
  render() {
    return (
      <div className="SkillsList" style={styles}>
        <h1>Skills</h1>
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

export default SkillsList;