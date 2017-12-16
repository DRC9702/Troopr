import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Panel, ControlLabel, FormControl, Button, FormGroup, HelpBlock } from 'react-bootstrap';
import axios from 'axios';
import PropTypes from 'prop-types';
import SelectSkills from './SelectSkills';
import Background from '../Images/bgimg1.jpg';

require('../styles/CreateProfileView.css');

class CreateProfileView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      skills: [],
      resume: '',
      bio: '',
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleResumeChange = this.handleResumeChange.bind(this);
    this.handleBioChange = this.handleBioChange.bind(this);
    this.createProfile = this.createProfile.bind(this);
    this.changeCheckbox = this.changeCheckbox.bind(this);
  }
  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleResumeChange(e) {
    this.setState({ resume: e.target.value });
  }

  handleBioChange(e) {
    this.setState({ bio: e.target.value });
  }

  changeCheckbox(e, title) {
    if (e.target.checked === true) {
      if (title === 'Skills') {
        this.state.skills.push(e.target.value);
      }
    } else if (title === 'Skills') {
      const index = this.state.skills.indexOf(e.target.value);
      if (index > -1) {
        this.state.skills.splice(index, 1);
      }
    }
  }

  createProfile(e) {
    // var self

    e.preventDefault();
    // self = this

    // console.log(this.state);
    // const data = {
    //   name: this.state.name,
    //   skills: this.state.skills,
    //   resume: this.state.resume,
    //   bio: this.state.bio,
    // };

    // Submit form via jQuery/AJAX
    axios.post('/api/create_profile', {
      name: this.state.name,
      skills: this.state.skills,
      resume: this.state.resume,
      bio: this.state.bio,
    }).then((response) => {
      if (response.data.success) {
        this.props.history.push('/profile');
      } else if (response.data.message) {
        if (response.data.message === 'need login') {
          this.props.history.push('/');
        } else {
              alert(response.data.message); // eslint-disable-line
          } // eslint-disable-line
      }
    }).catch((error) => {
      console.log(error); // eslint-disable-line 
    });
  }

  render() {
    return (
      <div className="CreateProfileView">
        <div className="BackgroundImg">
          <img src={Background} alt="" style={{ height: '100%', width: '100%' }} />
        </div >
        <h1 style={{ zIndex: '2' }}>Create Profile</h1>
        <Panel header="Info" bsStyle="primary" style={{ width: '75%', margin: '20px', zIndex: '2' }}>
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
              <SelectSkills title="Skills" changeCheckbox={this.changeCheckbox} />
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

            <Button bsStyle="primary" type="submit" onClick={this.createProfile}>
                Create
            </Button>
            <br /><br />
          </form>
        </Panel>
      </div>
    );
  }
}

CreateProfileView.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

function FieldGroup({ // eslint-disable-next-line react/prop-types
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

export default withRouter(CreateProfileView);
