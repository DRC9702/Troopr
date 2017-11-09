import React, { Component } from 'react';
import {Checkbox, Radio, ControlLabel, FormControl, Button, FormGroup, HelpBlock} from 'react-bootstrap';

class CreateAccountView extends Component {


    render() {
        return (
            <div className="CreateAccountView" style={styles}>
                <br/><br/><br/><br/>
                <form>
                    <br/><br/><br/><br/>
                    <FieldGroup
                        id="formControlsText"
                        type="text"
                        label="Username"
                        placeholder="Enter Username"
                    />

                    <FieldGroup
                        id="formControlsPassword"
                        label="Password"
                        type="password"
                    />
                    <Button type="submit" bsStyle='primary'>
                        Submit
                    </Button>
                </form>
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
