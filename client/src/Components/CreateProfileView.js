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
                        id="formControlsSkills"
                        type="text"
                        label="Skills"
                        placeholder="Enter skills"
                    />

                    <FieldGroup
                        id="formControlsFile"
                        type="text"
                        label="Resume"
                        placeholder="Enter Resume"
                    />

                    <FormGroup controlId="formControlsTextarea">
                        <ControlLabel>Bio</ControlLabel>
                        <FormControl componentClass="textarea" placeholder="textarea" />
                    </FormGroup>

                    <Button type="submit" onClick={this.create_account}>
                        Submit
                    </Button>
                </form>
            </div>
        );
    }

    create_account= (e) =>{
        var self

        e.preventDefault()
        self = this

        console.log(this.state);

        var data = {
            name: this.state.name,
            skills: this.state.skills,
            resume: this.state.resume
        }

        // Submit form via jQuery/AJAX
        console.log(data)
        axios.post('/api/create_profile', {
            email: this.state.email,
            username: this.state.username,
            password: this.state.password
        })
            .then(function (response) {
                console.log(response);
                console.log(response.data.success);
                console.log(response.data.user);

                if(response.data.success) {
                    window.location = '/profile';
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

export default CreateProfileView;