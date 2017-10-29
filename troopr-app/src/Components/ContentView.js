import React, { Component } from 'react';
import ColumnView from './ColumnView';

class ContentView extends Component {
  render() {
    return (
      <div className="ContentView" style={styles}>
        <ColumnView viewName='Profile'/>
        <p style={{background: 'blue'}}>
          Troopr CONTENTVIEW
        </p>
        <ColumnView viewName='Events'/>
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
