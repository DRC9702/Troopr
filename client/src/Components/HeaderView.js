import React, { Component } from 'react';
import { Navbar, Button, ButtonToolbar, FormGroup, FormControl, Modal, Form } from 'react-bootstrap';
import SearchBar from './SearchBar';
import {Link} from 'react-router-dom';
require('../styles/HeaderView.css');

class HeaderView extends Component {
  constructor(props){
    super(props);
    this.state = {loggedIn: props.loggedIn};
    this.hideModal = this.hideModal.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  getText() {
    if(this.props.loggedIn)
      return 'Log out'
    else
      return 'Log in'
  }

  showModal() {
    this.setState({ show: true });
  };

  hideModal() {
    this.setState({
        show: false,
    });
  };

  componentWillReceiveProps(newProps) {
    this.setState({show: newProps.show});
  }

  render() {
    return (
      <div className="HeaderView">      
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">Brand</a>
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
              <Button type="button" onClick={this.props.promptLoginHandler}>{this.getText()}</Button>
            </Navbar.Form>
          </Navbar.Collapse>
        </Navbar>

        <Modal show={this.state.show} onHide={this.hideModal}>
          <Modal.Header>
              <Modal.Title>Troopr Login</Modal.Title>
          </Modal.Header>
            <Modal.Body>
            <Form inline>
                {/*<form style={formStyle} onSubmit={this.props.loginHandler}>*/}
                <FormControl type="text" placeholder="Username"/>
                <br/><br/>
                <FormControl type="text" placeholder="Password"/>
            </Form>
           </Modal.Body>
        <Modal.Footer>
            <Button bsStyle="link" onClick={this.props.depromptLoginHandler}>
                <Link to='/create_account'>
                Create Account
                </Link>
            </Button>
            <Button bsStyle='success' type="submit" value="Login" onClick={this.props.loginHandler}>Log in</Button>
        </Modal.Footer>
        </Modal>

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
