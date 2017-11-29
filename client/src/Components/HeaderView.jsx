import React, { Component } from 'react';
import { Navbar, Button, FormGroup, FormControl, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import PropTypes from 'prop-types';

require('../styles/HeaderView.css');

class HeaderView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // loggedIn: props.loggedIn,
      show: props.show,
      email: '',
      username: '',
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
  }

  componentWillReceiveProps(newProps) {
    this.setState({ show: newProps.show });
  }

  getText() {
    if (this.props.loggedIn) {
      return `Log out: ${this.state.email}:${this.state.username}`;
    }
    return 'Log in';
  }

  handleSearchChange(e) {
    this.setState({ searchKey: e.target.value });
  }

  doSearch(e) {
    window.location = `/events/${this.state.searchKey}`;
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  showModal() {
    this.setState({ show: true });
  }

  hideModal() {
    this.setState({
      show: false,
    });
  }

  createAcct() {
    window.location = '/create_account';
  }

  signIn(e) {
  // var self

    e.preventDefault();
    // self = this

    console.log(this.state);

    const data = {
      email: this.state.email,
      password: this.state.password,
    };

    // Submit form via jQuery/AJAX
    console.log(data);
    axios.post('/api/sign_in', {
      email: this.state.email,
      password: this.state.password,
    }).then((response) => {
      if (response.data.success) {
        console.log('YES');
        window.location = '/dashboard';
      } else {
        console.log('No');
        alert('Wrong email or password!');
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <div className="HeaderView">
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/dashboard">Brand</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Navbar.Form pullLeft>
              <FormGroup>
                <FormControl type="text" placeholder="Search" onChange={this.handleSearchChange} />
              </FormGroup>
              {' '}
              <Button type="submit" onClick={this.doSearch}>Submit</Button>
            </Navbar.Form>
            <Navbar.Form pullRight>
              <Button type="button" onClick={this.props.promptLoginHandler}>
                {this.getText()}
              </Button>
            </Navbar.Form>
          </Navbar.Collapse>
        </Navbar>

        <Modal show={this.state.show} onHide={this.hideModal}>
          <Modal.Header>
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
  loggedIn: PropTypes.bool.isRequired,
  show: PropTypes.bool.isRequired,
  promptLoginHandler: PropTypes.func.isRequired,
  depromptLoginHandler: PropTypes.func.isRequired,

};

// const styles = {
//     backgroundColor: 'red',
//     display: 'flex',
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignContent: 'center',
// };

export default HeaderView;
