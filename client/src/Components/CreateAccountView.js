import React, { Component } from 'react';
import {Checkbox, Radio, ControlLabel, FormControl, Button, FormGroup, HelpBlock, Jumbotron} from 'react-bootstrap';
import axios from 'axios';
import {Link} from 'react-router-dom';


class CreateAccountView extends Component {

  constructor(props){
    super(props);
    this.state = {
        email: '',
        username:'',
        password:''
    };
  }
  handleEmailChange= (e) => {
     this.setState({email: e.target.value});
  }
  handleUserChange= (e) => {
     this.setState({username: e.target.value});
  }

  handlePasswordChange= (e) =>{
     this.setState({password: e.target.value});
  }
    render() {
        return (
            <div className="CreateAccountView" style={styles}>
            <Jumbotron style={{width: '100vh'}}>
              <h1>Create Account</h1>
              {/* <p><Button bsStyle="primary">Learn more</Button></p> */}
              <form>
                <ControlLabel>Email Address</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.email}
                  placeholder="troop@troopr.edu"
                  onChange={this.handleEmailChange}
                />
                <FormControl.Feedback />
                <HelpBlock>Please enter a valid email address.</HelpBlock>
                <ControlLabel>Username</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.username}
                  placeholder="Username"
                  onChange={this.handleUserChange}
                />
                <FormControl.Feedback />
                <HelpBlock>Please enter a username.</HelpBlock>
                <ControlLabel>Password</ControlLabel>
                <FormControl
                  type="password"
                  value={this.state.password}
                  placeholder="Password"
                  onChange={this.handlePasswordChange}
                />
                <FormControl.Feedback />

                <HelpBlock>Please confirm your password.</HelpBlock>
                <Button onClick={this.create_account}>
                  <Link to='/home'>
                    Create Account
                  </Link>
                </Button>
              </form>
            </Jumbotron>
          </div>
        );
    }
    create_account= (e) =>{
        var self

        e.preventDefault()
        self = this

        console.log(this.state);

        var data = {
          email: this.state.email,
          username: this.state.username,
          password: this.state.password
        }

        // Submit form via jQuery/AJAX
        console.log(data)
        axios.post('/api/create_account', {
          email: this.state.email,
          username: this.state.username,
          password: this.state.password
        })
          .then(function (response) {
            console.log(response);
            console.log(response.data.success);
            console.log(response.data.user);

            if(response.data.success) {
                window.location = '/create_profile';
            } else {
                alert("Account already exists");
            }

          })
          .catch(function (error) {
            console.log(error);
          })
    }
}

const styles = {
    backgroundColor: 'orange',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    flexGrow: 1,
};

function FieldGroup({ id, label, help, ...props }) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}

export default CreateAccountView;
