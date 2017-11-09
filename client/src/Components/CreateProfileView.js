import React, { Component } from 'react';
import {Checkbox, Radio, ControlLabel, FormControl, Button, FormGroup, HelpBlock} from 'react-bootstrap';

class CreateProfileView extends Component {


    render() {
        return (
            <div className="CreateProfileView" style={styles}>
                {/*<p>Name</p>*/}
                {/*<SkillsList />*/}
                {/*<p>Bio</p>*/}
                {/*<p>Links</p>*/}
                <br/><br/><br/><br/>
                <form>
                    <br/><br/><br/><br/>
                    <FieldGroup
                        id="formControlsText"
                        type="text"
                        label="Name"
                        placeholder="Enter Name"
                    />

                    <FieldGroup
                        id="formControlsEmail"
                        type="email"
                        label="Email address"
                        placeholder="Enter email"
                    />

                    <FieldGroup
                        id="formControlsSkills"
                        type="skills"
                        label="Skills"
                        placeholder="Enter skills"
                    />

                    <FieldGroup
                        id="formControlsFile"
                        type="file"
                        label="Resume"
                    />

                    <FormGroup controlId="formControlsTextarea">
                        <ControlLabel>Bio</ControlLabel>
                        <FormControl componentClass="textarea" placeholder="textarea" />
                    </FormGroup>

                    <Button type="submit">
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
