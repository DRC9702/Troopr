import React, { Component } from 'react';
import { ControlLabel, FormControl, Button, FormGroup, HelpBlock } from 'react-bootstrap';
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

class CreateProfileView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      skills: '',
      resume: '',
      bio: '',
    };
    this.createProfile = this.createProfile.bind(this);
  }
  handleNameChange = function(e) {
    this.setState({ name: e.target.value });
  }.bind(this)

  handleSkillsChange = function(e) {
    this.setState({ skills: e.target.value });
  }.bind(this)

  handleResumeChange = function(e) {
    this.setState({ resume: e.target.value });
  }.bind(this)

  handleBioChange = function(e) {
    this.setState({ bio: e.target.value });
  }.bind(this)

  createProfile(e) {
    // var self

    e.preventDefault();
    // self = this

    //console.log(this.state);
    const data = {
      name: this.state.name,
      skills: this.state.skills,
      resume: this.state.resume,
      bio: this.state.bio,
    };

    // Submit form via jQuery/AJAX
    console.log(data);
    axios.post('/api/create_profile', {
      name: this.state.name,
      skills: this.state.skills,
      resume: this.state.resume,
      bio: this.state.bio,
    })
      .then((response) => {
        console.log(response);
        console.log(response.data.success);
        console.log(response.data.user);

        if (response.data.success) {
          window.location = '/profile';
        } else {
          alert('profile created failed');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="CreateProfileView" style={styles}>
        {/* <p>Name</p> */}
        {/* <SkillsList /> */}
        {/* <p>Bio</p> */}
        {/* <p>Links</p> */}
        <br /><br />
          <h1>Create Profile</h1>
          <form>
          <FieldGroup
            id="formControlsText"
            type="text"
            value={this.state.name}
            label="Name"
            onChange={this.handleNameChange}
            placeholder="Enter Name"
          />

          <FieldGroup
            id="formControlsSkills"
            type="text"
            value={this.state.skills}
            label="Skills"
            onChange={this.handleSkillsChange}
            placeholder="Enter skills"
          />

          <FieldGroup
            id="formControlsFile"
            type="text"
            value={this.state.resume}
            label="Resume"
            onChange={this.handleResumeChange}
            placeholder="Enter Resume"
          />

          <FormGroup controlId="formControlsTextarea">
            <ControlLabel>Bio</ControlLabel>
            <FormControl
              componentClass="textarea"
              value={this.state.bio}
              onChange={this.handleBioChange}

              placeholder="textarea"
            />
          </FormGroup>

          <Button bsStyle="primary" type="submit" onClick={this.createProfile}>
              Create
          </Button>
          <br/><br/>
        </form>
      </div>
    );
  }
}

function FieldGroup({
  id, label, help, ...props
}) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

export default CreateProfileView;
