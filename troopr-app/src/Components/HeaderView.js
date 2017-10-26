import React, { Component } from 'react';
import SearchBar from './SearchBar';

class HeaderView extends Component {
  render() {
    return (
      <div className="HeaderView" style={styles}>
      	<p>
          Troopr HEADER
        </p>
      	<SearchBar />
      </div>
    );
  }
}

const styles = {
    backgroundColor: 'red',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
};

export default HeaderView;
