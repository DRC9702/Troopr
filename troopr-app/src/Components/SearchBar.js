import React, { Component } from 'react';

class SearchBar extends Component {
  render() {
    return (
      <div className="SearchBar" style={styles}>
        <form style={styles}>
	        <input
	          type="text"
	          placeholder="Search..."
	          value={this.props.filterText}
	          ref="filterTextInput"
	          onChange={this.handleChange}
	        />
          <input type="submit" value="Search" />
      	</form>
      </div>
    );
  }
}

const styles = {
    backgroundColor: 'blue',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
};

export default SearchBar;
