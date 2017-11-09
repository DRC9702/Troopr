import React, { Component } from 'react';
import { Button, Modal, Form, FormControl, Jumbotron, FormGroup, Col, ControlLabel, HelpBlock, Label } from 'react-bootstrap';
require('../styles/LoginView.css');

class LoginView extends Component {

  constructor(props){
    super(props);
    this.state = {
        show: props.show,
    };
    this.hideModal = this.hideModal.bind(this);
    this.showModal = this.showModal.bind(this);
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
      <div className="LoginView">
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
            {/* {<Button bsStyle="link">Create Account</Button>} */}
            <Button bsStyle='success' type="submit" value="Login" onClick={this.props.loginHandler}>Sign in</Button>
        </Modal.Footer>
        </Modal>

        <Jumbotron style={{width: '100vh'}}>
          <h1>Welcome to Troopr!</h1>
          <h2>Welcome to teamwork. Welcome to perfection. Welcome. Home.</h2>
          <p>Create Account</p>
          {/* <p><Button bsStyle="primary">Learn more</Button></p> */}
          <form>
            <ControlLabel>Email Address</ControlLabel>
            <FormControl
              type="text"
              /* value={this.state.value} */
              placeholder="troop@troopr.edu"
              /* onChange={this.handleChange} */
            />
            <FormControl.Feedback />
            <HelpBlock>Please enter a valid email address.</HelpBlock>
            <ControlLabel>Username</ControlLabel>
            <FormControl
              type="text"
              /* value={this.state.value} */
              placeholder="Username"
              /* onChange={this.handleChange} */
            />
            <FormControl.Feedback />
            <HelpBlock>Please enter a username.</HelpBlock>
            <ControlLabel>Password</ControlLabel>
            <FormControl
              type="password"
              /* value={this.state.value} */
              placeholder="Password"
              /* onChange={this.handleChange} */
            />
            <FormControl.Feedback />
            <HelpBlock>Please enter your password.</HelpBlock>
            <ControlLabel>Confirm Password</ControlLabel>
            <FormControl
              type="password"
              /* value={this.state.value} */
              placeholder="Confirm Password"
              /* onChange={this.handleChange} */
            />
            <FormControl.Feedback />
            <HelpBlock>Please confirm your password.</HelpBlock>
            <Button type="submit">Submit</Button>
          </form>
      </Jumbotron>

      </div>
    );
  }
}

const contentStyle = {
    backgroundColor: 'purple',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // height: '500px',
    // width: '500px',
    borderRadius: '10px',
};

export default LoginView;
