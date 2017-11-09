import React, { Component } from 'react';
import { Navbar, Button, FormGroup, FormControl, Modal, Form } from 'react-bootstrap';
// import SearchBar from './SearchBar';
import {Link} from 'react-router-dom';
import axios from 'axios';

require('../styles/HeaderView.css');

class HeaderView extends Component {
  constructor(props){
    super(props);
    this.state = {loggedIn: props.loggedIn};
    this.hideModal = this.hideModal.bind(this);
    this.showModal = this.showModal.bind(this);
    this.state = {
        show: props.show,
        email: '',
        username:'',
        password:''
    };
  }
  handleEmailChange= (e) => {
     this.setState({email: e.target.value});
  }

  handlePasswordChange= (e) =>{
     this.setState({password: e.target.value});
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
                <Button bsStyle="link" onClick={this.props.depromptLoginHandler}>
                    <Link to='/create_account'>
                    Create Account
                    </Link>
                </Button>
                <Button bsStyle='success' type="submit" value="Login" onClick={this.sign_in}>
                    Sign in
                </Button>
            </Modal.Footer>
        </Modal>

      </div>
    );
  }
  sign_in= (e) =>{
  // var self

  e.preventDefault()
  // self = this

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
          window.location='/dashboard';
      }else{
        console.log("No")
          alert("Wrong email or password!");
      }

    })
    .catch(function (error) {
      console.log(error);
    })

}
}

// const styles = {
//     backgroundColor: 'red',
//     display: 'flex',
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignContent: 'center',
// };

export default HeaderView;
