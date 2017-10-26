import React, { Component } from 'react';
import HeaderView from './HeaderView';
import SideView from './SideView';
import ContentView from './ContentView';

class MainViewer extends Component {
  render() {
    return (
      <div className="MainViewer" style={topStyle}>
        <HeaderView />
        <div style={innerStyle}>
          <SideView />
          <ContentView />
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
    alignItems: 'stretch',
};

export default MainViewer;
