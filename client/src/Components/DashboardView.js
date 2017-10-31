import React, { Component } from 'react';
import ColumnView from './ColumnView';

class DashboardView extends Component {
    constructor(props) {
        super(props);
    }
  render() {
    return (
        <div className="ContentView" style={styles}>
          <ColumnView viewName='Profile' toProfileHandler = {this.props.toProfileHandler}/>
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

export default DashboardView;