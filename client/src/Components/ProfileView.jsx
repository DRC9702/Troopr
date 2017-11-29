import React, { Component } from 'react';
// import ContentView from './ContentView';
// import SkillsList from './SkillsList';
import { Button } from 'react-bootstrap';
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
    this.handleEdit = this.handleEdit.bind(this);
  }
  componentDidMount() {
    let _this = this;
    axios.post('/api/profile', {
    })
      .then((response) => {
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
      .catch((error) => {
        console.log(error)
        console.log("failed1")
      });
  }

  handleEdit(e) {
    window.location = '/edit_profile';
  }

  render() {
    return (
      <div className="ProfileView" style={styles}>
        <p>Name: {this.state.name}</p>
        <p>SkillsList: {this.state.skills}</p>
        <p>Bio: {this.state.bio}</p>
        <p>Resume: {this.state.resume}</p>
        <Button onClick={this.handleEdit}>Edit</Button>
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

// function FieldGroup({ id, label, help, ...props }) {
//     return (
//         <FormGroup controlId={id}>
//             <ControlLabel>{label}</ControlLabel>
//             <FormControl {...props} />
//             {help && <HelpBlock>{help}</HelpBlock>}
//         </FormGroup>
//     );
// }

export default ProfileView;
