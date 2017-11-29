import React, { Component } from 'react';
// import ContentView from './ContentView';
// import SkillsList from './SkillsList';
// import {ControlLabel, FormControl, FormGroup, HelpBlock} from 'react-bootstrap';
import axios from 'axios';

class ProfileView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      skills: '',
      resume: '',
      bio: '',
    };
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
          console.log(response.data.name);
          console.log(response.data.skills);
          console.log(response.data.resume);
          console.log(response.data.bio);
        } else {
          console.log('failed2');
        }
      })
      .catch(function (error) {
        console.log(error)
        console.log("failed1")
      });
  }

  render() {
    return (
      <div className="ProfileView">
        <p>Name: {this.state.name}</p>
        <p>SkillsList: {this.state.skills}</p>
        <p>Bio: {this.state.bio}</p>
        <p>Resume: {this.state.resume}</p>
      </div>
    );
  }
}

export default ProfileView;
