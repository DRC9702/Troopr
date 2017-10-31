import React, { Component } from 'react';

class SideView extends Component {

  render() {
    return (
      <div className="SideView" style={styles}>
      	<p>
          Troopr SIDEVIEW
        </p>
      </div>
    );
  }
}

const styles = {
    backgroundColor: 'green',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center ',
    height: '100vh',
    width: '300px',
};

export default SideView;
