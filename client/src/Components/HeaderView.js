import React, { Component } from 'react';
import SearchBar from './SearchBar';

class HeaderView extends Component {
  constructor(props){
    super(props);
    this.state = {loggedIn: props.loggedIn};
  }

  render() {
    if(this.props.loggedIn)
      return this.renderLoggedIn();
    else
      return this.renderLoggedOut();
  }

  renderLoggedOut(){
    return (
      <div className="HeaderView" style={styles}>
      	<p>
          Troopr HEADER {this.props.loggedIn ? "in" : "out"}
        </p>
      	<SearchBar />
      </div>
    );
  }

  renderLoggedIn(){
    return (
      <div className="HeaderView" style={styles}>
      	<p>
          Troopr HEADER {this.props.loggedIn ? "in" : "out"}
        </p>
      	<SearchBar />
        <form onSubmit={this.props.logoutHandler}>
          <input type="submit" value="Log Out" />
        </form>
      </div>
    );
  }
}

const styles = {
    backgroundColor: 'red',
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
};

export default HeaderView;
