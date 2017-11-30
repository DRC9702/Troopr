import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Panel, ControlLabel, FormControl, Button, FormGroup, HelpBlock } from 'react-bootstrap';
import axios from 'axios';
import PropTypes from 'prop-types';


require('../styles/CreateProfileView.css');

class EditProfileView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      skills: '',
      resume: '',
      bio: '',
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSkillsChange = this.handleSkillsChange.bind(this);
    this.handleResumeChange = this.handleResumeChange.bind(this);
    this.handleBioChange = this.handleBioChange.bind(this);
    this.editProfile = this.editProfile.bind(this);
  }

  componentDidMount() {
    axios.post('/api/profile', {
    })
      .then((response) => {
        if (response.data.success) {
          this.setState({
            name: response.data.name,
            skills: response.data.skills,
            resume: response.data.resume,
            bio: response.data.bio,
          });
          console.log(this.state.data.name);
          console.log(this.state.data.skills);
          console.log(this.state.data.resume);
          console.log(this.state.data.bio);
        } else {
          console.log('failed2');
        }
      })
      .catch((error) => {
        console.log(error);
        console.log('failed1');
      });
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleSkillsChange(e) {
    this.setState({ skills: e.target.value });
  }

  handleResumeChange(e) {
    this.setState({ resume: e.target.value });
  }

  handleBioChange(e) {
    this.setState({ bio: e.target.value });
  }

  editProfile(e) {
    // var self

    e.preventDefault();
    // self = this

    // console.log(this.state);
    const data = {
      name: this.state.name,
      skills: this.state.skills,
      resume: this.state.resume,
      bio: this.state.bio,
    };

    // Submit form via jQuery/AJAX
    console.log(data);
    axios.post('/api/edit_profile', {
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
          this.props.history.push('/profile');
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
      <div className="CreateProfileView">
        <br /><br />
        <h1>Edit Profile:{this.state.name}</h1>
        <Panel header="Info" bsStyle="primary" style={{ width: '75%', margin: '20px' }}>
          <form>
            <FieldGroup
              id="formControlsText"
              type="text"
              value={this.state.name}
              label="Name"
              onChange={this.handleNameChange}
              placeholder="Enter Name"
            />

            <FormGroup controlId="formControlsSkills">
              <ControlLabel>Skills</ControlLabel>
              <FormControl
                componentClass="textarea"
                value={this.state.skills}
                onChange={this.handleSkillsChange}
                placeholder="Enter Skills Separated By Newlines"
              />
            </FormGroup>

            <FormGroup controlId="formControlsFile">
              <ControlLabel>Resume</ControlLabel>
              <FormControl
                componentClass="textarea"
                value={this.state.resume}
                onChange={this.handleResumeChange}
                placeholder="Enter Resume"
              />
            </FormGroup>

            <FormGroup controlId="formControlsTextarea">
              <ControlLabel>Bio</ControlLabel>
              <FormControl
                componentClass="textarea"
                value={this.state.bio}
                onChange={this.handleBioChange}
                placeholder="textarea"
              />
            </FormGroup>

            <Button bsStyle="primary" type="submit" onClick={this.editProfile}>
                Finish Edit
            </Button>
            <br /><br />
          </form>
        </Panel>
      </div>
    );
  }
}

EditProfileView.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

// eslint-disable-next-line object-curly-newline
function FieldGroup({ id, label, help, ...props }) { // eslint-disable-line react/prop-types
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

export default withRouter(EditProfileView);
