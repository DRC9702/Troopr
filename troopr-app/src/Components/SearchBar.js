import React, { Component } from 'react';

class SearchBar extends Component {
  render() {
    return (
      <div className="SearchBar">
        <form>
	        <input
	          type="text"
	          placeholder="Search..."
	          value={this.props.filterText}
	          ref="filterTextInput"
	          onChange={this.handleChange}
	        />
      	</form>
      </div>
    );
  }
}

export default SearchBar;
