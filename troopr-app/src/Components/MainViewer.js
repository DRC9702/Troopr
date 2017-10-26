import React, { Component } from 'react';
import HeaderView from './HeaderView';
import SideView from './SideView'

class MainViewer extends Component {
  render() {
    return (
      <div className="MainViewer" style={topStyle}>
        <HeaderView />
        <div style={innerStyle}>
          <SideView />
          <p>
            Hello!
          </p>
        </div>
      </div>
    );
  }
}

const topStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
};

const innerStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flexStart',
};

export default MainViewer;
