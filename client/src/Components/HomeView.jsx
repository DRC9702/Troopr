import React, { Component } from 'react';
import { Jumbotron} from 'react-bootstrap';

require('../styles/HomeView.css');

class HomeView extends Component {

  constructor(props){
    super(props);
    this.state = {
        show: props.show,
        email: '',
        username:'',
        password:''
    };
  }

  render() {
    return (
      <div className="HomeView">
        <Jumbotron style={{width: '100vh'}}>
          <h1>Welcome to Troopr!</h1>
          <h2>Welcome to teamwork. Welcome to perfection. Welcome. Home.</h2>
        </Jumbotron>
      </div>
    );
  }

}

// const contentStyle = {
//     backgroundColor: 'purple',
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//     // height: '500px',
//     // width: '500px',
//     borderRadius: '10px',
// };

export default HomeView;
