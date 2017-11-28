import React, { Component } from 'react';
import { Navbar, Button, FormGroup, FormControl, Modal, Form, Jumbotron} from 'react-bootstrap';
require('../styles/VideoOverlay.css');
require('../styles/HomeView.css');

class HomeView extends Component {

  constructor(props){
    super(props);
    this.state = {
        show: props.show,
        email: '',
        username:'',
        password:'',
        mp4URL: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/15309/developer-loop-1920x1080.mp4',
        webmURL: '../videos/Team-Work/WEBM/Team-Work.webm',
    };
  }

  render() {
    return (
      <div className="HomeView">
          <div class="video-overlay"></div>

        {/*<Jumbotron style={{width: '100vh'}}>*/}
          {/*<h1>Welcome to Troopr!</h1>*/}
          {/*<h2>Welcome to teamwork. Welcome to perfection. Welcome. Home.</h2>*/}
        {/*</Jumbotron>*/}
          <video id="background-video" loop autoPlay style={{
              objectFit: 'cover',
              top: '8.5%',
              left: '0%',
              width: '100%',
              height: '100%',
          }}>
              <source src={this.state.mp4URL} type="video/mp4" />
              <source src={this.state.webmURL} type="video/webm" />
              Your browser does not support the video tag.
          </video>

          <div class="text-copy" style={{width: '100vh'}}>
              <h1>Welcome to Troopr!</h1>
              <p>Welcome to teamwork. Welcome to perfection.</p>
              <p>Welcome. Home.</p>
          </div>

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
