import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { FormGroup, ControlLabel, FormControl, Button, HelpBlock, Jumbotron, Col, Row} from 'react-bootstrap';
import axios from 'axios';

const styles = {
  backgroundColor: 'orange',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  alignItems: 'center',
  flexWrap: 'wrap',
  flexGrow: 1,
};

const jumbotronstyle = {
    backgroundColor: 'orange',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    flexGrow: 1,
    width: '100vh',
}

class CreateAccountView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
    };
    this.createAccount = this.createAccount.bind(this);
  }



  handleEmailChange = function(e) {
    this.setState({ email: e.target.value });
  }.bind(this)

  handleUserChange = function(e) {
    this.setState({ username: e.target.value });
  }.bind(this)

  handlePasswordChange = function(e) {
    this.setState({ password: e.target.value });
  }.bind(this)

  createAccount = function(e) {
    // var self
    const data = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
    };
    e.preventDefault();
    // self = this

    console.log(this.state);

    // Submit form via jQuery/AJAX
    console.log(data);
    axios.post('/api/create_account', {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
    })
      .then((response) => {
        console.log(response);
        console.log(response.data.success);
        console.log(response.data.user);

        if (response.data.success) {
          this.props.history.push('/create_profile');
        } else {
          alert('Account already exists');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="CreateAccountView" style={styles}>
        <Jumbotron style={jumbotronstyle}>
          <h1>Create Account</h1>
          {/* <p><Button bsStyle="primary">Learn more</Button></p> */}
          <form>
            <Row>
            <Col sm={16}>
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
            </Col>
            </Row>
            <Row>
            <Col sm={16}>
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
            </Col>
            </Row>
            <Row>
            <Col sm={16}>
                <FormGroup>
                <ControlLabel>Password</ControlLabel>
                <FormControl
                  type="password"
                  value={this.state.password}
                  placeholder="Password"
                  onChange={this.handlePasswordChange}
                />
                <FormControl.Feedback />
                <HelpBlock>Please confirm your password.</HelpBlock>
                </FormGroup>
            </Col>
            </Row>
            <Button bsStyle="primary" onClick={this.createAccount}>
                Create
            </Button>
          </form>
        </Jumbotron>
      </div>
    );
  }
}

// function FieldGroup({ id, label, help, ...props }) {
//     return (
//         <FormGroup controlId={id}>
//             <ControlLabel>{label}</ControlLabel>
//             <FormControl {...props} />
//             {help && <HelpBlock>{help}</HelpBlock>}
//         </FormGroup>
//     );
// }

export default withRouter(CreateAccountView);
