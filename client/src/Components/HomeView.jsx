import React, { Component } from 'react';

require('../styles/VideoOverlay.css');
require('../styles/HomeView.css');

class HomeView extends Component {
  constructor(props) {
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
        <div className="video-overlay" />

        <video
          id="background-video"
          loop
          autoPlay
          style={{
            position: 'absolute',
            top: '0',
            bottom: '0',
            left: '0',
            right: '0',
          }}
        >

          <track kind="captions" />

          <source src={this.state.mp4URL} type="video/mp4" />
          <source src={this.state.webmURL} type="video/webm" />
          Your browser does not support the video tag.
        </video>

        
        <div className="text-copy">
          <h1>Welcome to Troopr!</h1>
          <p>Welcome to teamwork. Welcome to perfection.</p>
          <p>Welcome. Home.</p>
        </div>

      </div>
    );
  }

}

export default HomeView;
