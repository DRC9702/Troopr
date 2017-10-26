import React, { Component } from 'react';
import SearchBar from './SearchBar';

class HeaderView extends Component {
  render() {
    return (
      <div className="HeaderView">
      	<SearchBar />
        <p>
          Hello!
        </p>
      </div>
    );
  }
}



export default HeaderView;
