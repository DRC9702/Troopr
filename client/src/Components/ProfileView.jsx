import React, { Component } from 'react';
import { Panel, Label } from 'react-bootstrap';
import axios from 'axios';

require('../styles/ProfileView.css');

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
          console.log(this.state.data.name);
          console.log(this.state.data.skills);
          console.log(this.state.data.resume);
          console.log(this.state.data.bio);
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
    const bap = ['bap', 'boop', 'bep', 'booperino', 'bap', 'boop', 'bep', 'booperino', 'bap', 'boop', 'bep', 'booperino'];
    // replace bap with this.state.skills which should be in the form of a list
    return (
      <div className="ProfileView">
        <h1>{this.state.name}</h1>
        <Panel header="Skills" bsStyle="primary" style={{ width: '75%', margin: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
            {bap.map(listValue =>
              <h4><Label style={{ margin: '5px' }}>{listValue}</Label></h4>)}
          </div>
        </Panel>
        <Panel header="Bio" bsStyle="primary" style={{ width: '75%', margin: '20px' }}>
          <div id="bioContent">
            <pre>{this.state.bio}</pre>
          </div>
        </Panel>
        <Panel header="Resume" bsStyle="primary" style={{ width: '75%', margin: '20px' }}>
          <div id="resumeContent">
            <pre>{this.state.resume}</pre>
          </div>
        </Panel>
      </div>
    );
  }
}

export default ProfileView;
