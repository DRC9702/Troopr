import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Button, Modal, Form, FormControl, Jumbotron, FormGroup, Col, ControlLabel, HelpBlock, Label } from 'react-bootstrap';
import axios from 'axios';

require('../styles/LoginView.css');

class LoginView extends Component {

  constructor(props){
    super(props);
    this.state = {
        show: props.show,
        email: '',
        password:''
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
  handleEmailChange= (e) => {
     this.setState({email: e.target.value});
  }

  handlePasswordChange= (e) =>{
     this.setState({password: e.target.value});
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
                <FormControl
                  type="text"
                  value={this.state.email}
                  placeholder="Email"
                  onChange={this.handleEmailChange}
                />
                <br/><br/>
                <FormControl
                  type="password"
                  value={this.state.password}
                  placeholder="Password"
                  onChange={this.handlePasswordChange}
                />
            </Form>
           </Modal.Body>
        <Modal.Footer>
            <Button bsStyle="link">
                <Link to='/create_account'>
                Create Account
                </Link>
            </Button>
            <Button bsStyle='success' type="submit" value="Login" onClick={this.sign_in}>Sign in</Button>
        </Modal.Footer>
        </Modal>



      </div>
    );
  }
  sign_in= (e) =>{
  var self

  e.preventDefault()
  self = this

  console.log(this.state);

  var data = {
    email: this.state.email,
    password: this.state.password
  }

  // Submit form via jQuery/AJAX
  console.log(data)
  axios.post('/api/sign_in', {
    email: this.state.email,
    password: this.state.password
  })
    .then(function (response) {
      if(response.data.success){
        console.log("YES")
      }else{
        console.log("No")
      }

    })
    .catch(function (error) {
      console.log(error);
    })

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
