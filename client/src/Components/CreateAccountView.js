import React, { Component } from 'react';
import {Checkbox, Radio, ControlLabel, FormControl, Button, FormGroup, HelpBlock, Jumbotron} from 'react-bootstrap';

class CreateAccountView extends Component {


    render() {
        return (
            <div className="CreateAccountView" style={styles}>
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