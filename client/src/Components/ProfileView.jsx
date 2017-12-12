import React, { Component } from 'react';
import { Panel, Label, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Background from '../Images/bgimg1.jpg';

require('../styles/ProfileView.css');

class ProfileView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      skills: [],
      resume: '',
      bio: '',
    };
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
          // console.log(this.state.data.name);
          // console.log(this.state.data.skills);
          // console.log(this.state.data.resume);
          // console.log(this.state.data.bio);
        } else {
          console.log('failed2'); // eslint-disable-line no-console
        }
      })
      .catch((error) => {
        console.log(error); // eslint-disable-line no-console
        console.log('failed1'); // eslint-disable-line no-console
      });
  }

  editProfile() {
    this.props.history.push('/edit_profile');
  }

  render() {
    const skillList = this.state.skills;
    // replace bap with this.state.skills which should be in the form of a list
    return (
      <div className="ProfileView">
        <div className="BackgroundImg">
          <img src={Background} alt="" style={{ height: '100%', width: '100%' }} />
        </div>
        <h1 style={{ zIndex: 2 }}>{this.state.name}</h1>
        <div className="ProfilePanels">
          <Panel header="Skills" bsStyle="primary" >
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
              {skillList.map(listValue =>
                <h4><Label style={{ margin: '5px' }}>{listValue}</Label></h4>)}
            </div>
          </Panel>
          <Panel header="Bio" bsStyle="primary" >
            <div id="bioContent">
              <pre>{this.state.bio}</pre>
            </div>
          </Panel>
          <Panel header="Resume" bsStyle="primary" >
            <div id="resumeContent">
              <pre>{this.state.resume}</pre>
            </div>
          </Panel>
        </div>
        <Button bsStyle="primary" onClick={this.editProfile} style={{ zIndex: 2 }}>
          Edit
        </Button>
      </div>
    );
  }
}

ProfileView.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default withRouter(ProfileView);
