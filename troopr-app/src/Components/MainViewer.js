import React, { Component } from 'react';
import HeaderView from './HeaderView';

class MainViewer extends Component {
  render() {
    return (
      <div className="MainViewer">
        <HeaderView />
        <p>
          Hello!
        </p>
      </div>
    );
  }
}

export default MainViewer;
