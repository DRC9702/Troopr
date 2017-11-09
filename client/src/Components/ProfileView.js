import React, { Component } from 'react';
import ContentView from './ContentView';
import SkillsList from './SkillsList';
import {Checkbox, Radio, ControlLabel, FormControl, Button, FormGroup, HelpBlock} from 'react-bootstrap';

class ProfileView extends Component {


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
