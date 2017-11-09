import React, { Component } from 'react';
import { Button, Modal, Form, FormControl } from 'react-bootstrap';
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
            <Button bsStyle="link">Create Account</Button>
            <Button bsStyle='success' type="submit" value="Login" onClick={this.props.loginHandler}>Sign in</Button>
        </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const loginBoxStyle = {
    backgroundColor: 'purple',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '500px',
    width: '500px',
    borderRadius: '10px',
};

const formStyle = {
  backgroundColor: 'yellow',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  alignItems: 'center',
  width: '50vh',
};

export default LoginView;
