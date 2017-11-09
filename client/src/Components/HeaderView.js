import React, { Component } from 'react';
import { Navbar, Button, FormGroup, FormControl } from 'react-bootstrap';
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
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Brand</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Navbar.Form pullLeft>
            <FormGroup>
              <FormControl type="text" placeholder="Search" />
            </FormGroup>
            {' '}
            <Button type="submit">Submit</Button>
          </Navbar.Form>
        </Navbar.Collapse>
      </Navbar>
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
