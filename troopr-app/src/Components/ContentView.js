import React, { Component } from 'react';

class ContentView extends Component {
  render() {
    return (
      <div className="ContentView" style={styles}>
      	<p>
          Troopr CONTENTVIEW
        </p>
      </div>
    );
  }
}

const styles = {
    backgroundColor: 'orange',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
    flexGrow: 1,
};

export default ContentView;
