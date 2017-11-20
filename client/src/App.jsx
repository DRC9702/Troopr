import React, { Component } from 'react';
import './App.css';

import Main from './Components/Main';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Main />
        {/* <MainViewer loggedIn={false}/> */}
      </div>
    );
  }
}

export default App;
