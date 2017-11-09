import React, { Component } from 'react';
import ContentView from './ContentView';
import SkillsList from './SkillsList';
import {Checkbox, Radio, ControlLabel, FormControl, Button, FormGroup, HelpBlock} from 'react-bootstrap';
import axios from 'axios';

class ProfileView extends Component {


  componentDidMount() {
    axios.post('/api/profile', {
    })
      .then(function (response) {
        if(response.data.success){
          this.setState({name:response.data.name});
          this.setState({skills:response.data.skills});
          this.setState({resume:response.data.resume});
          this.setState({bio:response.data.bio});
          console.log(response.data.name)
          console.log(response.data.skills)
          console.log(response.data.resume)
          console.log(response.data.bio)
        }else{
          console.log("failed2")

        }

      })
      .catch(function (error) {
        console.log("failed1")
      })
  }

  render() {
    return (
      <div className="ProfileView" style={styles}>
        <p>Name</p>
        <SkillsList />
        <p>Bio</p>
        <p>Links</p>
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

export default ProfileView;
