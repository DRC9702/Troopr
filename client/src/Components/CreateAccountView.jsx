import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Panel, FormGroup, ControlLabel, FormControl, Button, HelpBlock } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';

require('../styles/CreateAccountView.css');

class CreateAccountView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
    };
    this.createAccount = this.createAccount.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.createAccount = this.createAccount.bind(this);
  }


  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handleUserChange(e) {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  createAccount(e) {
    e.preventDefault();
    // console.log(this.state);
    // Submit form via jQuery/AJAX
    // console.log(data);
    axios.post('/api/create_account', {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
    })
      .then((response) => {
        // console.log(response);
        // console.log(response.data.success);
        // console.log(response.data.user);

        if (response.data.success) {
          this.props.history.push('/create_profile');
          this.props.loginChecker();
        } else {
          alert('Account already exists'); // eslint-disable-line
        }
      })
      .catch((error) => {
        console.log(error); // eslint-disable-line no-console
      });
  }

  render() {
    return (
      <div className="CreateAccountView">
        <h1>Create Account</h1>
        <Panel header="Info" bsStyle="primary" style={{ width: '75%', margin: '20px' }}>
          <form>
            <FormGroup>
              <ControlLabel>Email Address</ControlLabel>
              <FormControl
                type="text"
                value={this.state.email}
                placeholder="troop@troopr.edu"
                onChange={this.handleEmailChange}
              />
              <FormControl.Feedback />
              <HelpBlock>Please enter a valid email address.</HelpBlock>
            </FormGroup>

            <FormGroup>
              <ControlLabel>Username</ControlLabel>
              <FormControl
                type="text"
                value={this.state.username}
                placeholder="Username"
                onChange={this.handleUserChange}
              />
              <FormControl.Feedback />
              <HelpBlock>Please enter a username.</HelpBlock>
            </FormGroup>

            <FormGroup>
              <ControlLabel>Password</ControlLabel>
              <FormControl
                type="password"
                value={this.state.password}
                placeholder="Password"
                onChange={this.handlePasswordChange}
              />
              <FormControl.Feedback />
              <HelpBlock>Please enter your password.</HelpBlock>
            </FormGroup>

            <Button bsStyle="primary" onClick={this.createAccount}>
                Create
            </Button>
          </form>
        </Panel>
      </div>
    );
  }
}

CreateAccountView.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  loginChecker: PropTypes.func.isRequired,
};

export default withRouter(CreateAccountView);
