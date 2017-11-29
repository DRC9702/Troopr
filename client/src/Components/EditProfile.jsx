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

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      skills: '',
      resume: '',
      bio: '',
    };
    this.editProfile = this.editProfile.bind(this);
  }

  componentDidMount() {
    var _this = this;
    axios.post('/api/profile', {
    })
      .then(function (response) {
        if(response.data.success){
          _this.setState({name:response.data.name});
          _this.setState({skills:response.data.skills});
          _this.setState({resume:response.data.resume});
          _this.setState({bio:response.data.bio});
          console.log(response.data.name)
          console.log(response.data.skills)
          console.log(response.data.resume)
          console.log(response.data.bio)

        }else{
          console.log("failed2")

        }

      })
      .catch(function (error) {
        console.log(error)
        console.log("failed1")
      })
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

  editProfile(e) {
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

    console.log(this.state);

    // Submit form via jQuery/AJAX
    // console.log(data);
    // axios.post('/api/edit_profile', {
    //   name: this.state.name,
    //   skills: this.state.skills,
    //   resume: this.state.resume,
    //   bio: this.state.bio,
    // })
    //   .then((response) => {
    //     console.log(response);
    //     console.log(response.data.success);
    //     console.log(response.data.user);

    //     if (response.data.success) {
    //       window.location = '/profile';
    //     } else {
    //       alert('profile created failed');
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }

  render() {
    return (
      <div className="EditProfile" style={styles}>
        <br /><br />
          <h1>Edit Profile</h1>
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
              Save
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

export default EditProfile;
