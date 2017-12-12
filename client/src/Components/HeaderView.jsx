import React, { Component } from 'react';
import { Navbar, Button, FormGroup, FormControl, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import PropTypes from 'prop-types';

require('../styles/HeaderView.css');

class HeaderView extends Component {
  constructor(props) {
    super(props);
    // console.log(props);
    this.state = {
      show: props.show,
      email: '',
      // username: '',
      password: '',
      searchKey: '',
    };
    this.signIn = this.signIn.bind(this);
    this.doSearch = this.doSearch.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleLoginButton = this.handleLoginButton.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({ ...this.state, show: newProps.show, isLoggedin: newProps.isLoggedin });
  }

  // getText() {
  //   if (this.props.loggedIn) {
  //     return `Log out: ${this.state.email}:${this.state.username}`;
  //   }
  //   return 'Log in';
  // }

  handleSearchChange(e) {
    this.setState({ ...this.state, searchKey: e.target.value });
  }

  doSearch(e) {
    e.preventDefault();
    const actualKey = (this.state.searchKey) ? this.state.searchKey : '$all';
    window.location = `/events/${actualKey}`;
  }

  handleEmailChange(e) {
    this.setState({ ...this.state, email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ ...this.state, password: e.target.value });
  }

  handleLoginButton() {
    // console.log('Hello from the handler!');
    if (this.props.isLoggedIn) {
      // console.log('Trying to log out');
      this.props.logoutHandler();
    } else {
      this.toggleModal();
    }
  }

  toggleModal() {
    if (this.state.show) {
      this.hideModal();
    } else {
      this.showModal();
    }
  }

  showModal() {
    // console.log('Openning Modal');
    this.setState({ ...this.state, show: true });
  }

  hideModal() {
    // console.log('Closing Modal');
    this.setState({
      ...this.state,
      show: false,
    });
  }

  createAcct() { // eslint-disable-line class-methods-use-this
    window.location = '/create_account';
  }

  signIn(e) {
  // var self

    e.preventDefault();
    // self = this

    // console.log(this.state);

    // Submit form via jQuery/AJAX
    // console.log(data);
    axios.post('/api/sign_in', {
      email: this.state.email,
      password: this.state.password,
    }).then((response) => {
      // console.log(response);
      if (response.data.success) {
        // console.log('YES');
        window.location = '/dashboard';
      } else {
        // console.log('No');
        alert('Wrong email or password!'); // eslint-disable-line 
      }
    }).catch((error) => {
      console.log(error); // eslint-disable-line no-console
    });
  }

  render() {
    return (
      <div className="HeaderView">
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/dashboard">Troopr</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Navbar.Form pullLeft>
              <FormGroup >
                <FormControl type="text" placeholder="Search" onChange={this.handleSearchChange} />
              </FormGroup>
              {' '}
              <Button type="submit" onClick={this.doSearch}>Submit</Button>
            </Navbar.Form>
            <Navbar.Form pullRight>
              <Button type="button" onClick={this.handleLoginButton}>
                {this.props.isLoggedIn ? 'Logout' : 'Login'}
              </Button>
            </Navbar.Form>
          </Navbar.Collapse>
        </Navbar>

        <Modal show={this.state.show} onHide={this.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>Troopr Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form inline>
              { /* <form style={formStyle} onSubmit={this.props.loginHandler}> */ }
              <FormControl
                type="text"
                value={this.state.email}
                placeholder="Email"
                onChange={this.handleEmailChange}
              />
              <br />
              <br />
              <FormControl
                type="password"
                value={this.state.password}
                placeholder="Password"
                onChange={this.handlePasswordChange}
              />
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="link" onClick={this.createAcct}>
              {/* <Link to="/create_account" href="/create_account"> */}
                Create Account
              {/* </Link> */}
            </Button>
            <Button bsStyle="success" type="submit" value="Login" onClick={this.signIn}>
              Sign in
            </Button>
          </Modal.Footer>
        </Modal>

      </div>
    );
  }
}

HeaderView.propTypes = {
  show: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  logoutHandler: PropTypes.func.isRequired,
};

export default HeaderView;
