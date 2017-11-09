import React, { Component } from 'react';
import { Navbar, Button, ButtonToolbar, FormGroup, FormControl } from 'react-bootstrap';
import SearchBar from './SearchBar';
require('../styles/HeaderView.css');

class HeaderView extends Component {
  constructor(props){
    super(props);
    this.state = {loggedIn: props.loggedIn};
  }

  getText() {
    if(this.props.loggedIn)
      return 'Log out'
    else
      return 'Log in'
  }

  render() {
    return (
      <div className="HeaderView">      
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
            <Navbar.Form pullRight>
              <Button type="button" onClick={this.props.logoutHandler}>{this.getText()}</Button>
            </Navbar.Form>
          </Navbar.Collapse>
        </Navbar>
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
