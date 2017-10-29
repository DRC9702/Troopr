import React, { Component } from 'react';
import HeaderView from './HeaderView';
import SideView from './SideView';
import ContentView from './ContentView';
import LoginView from './LoginView';

class MainViewer extends Component {
  constructor(props){
    super(props);
    this.state = {loggedIn: props.loggedIn};

    this.loginHandler = this.loginHandler.bind(this);
    this.logoutHandler = this.logoutHandler.bind(this);
  }

  loginHandler(e) {
    e.preventDefault();
    this.setState({
      loggedIn: true,
    })
  }


  logoutHandler(e) {
    e.preventDefault();
    this.setState({
      loggedIn: false,
    })
  }

  render() {
    if(this.state.loggedIn)
      return this.renderMain();
    else
      return this.renderLogin();
  }

  renderLogin() {
    return (
      <div className="MainViewer" style={topStyle}>
        <HeaderView loggedIn={this.state.loggedIn} logoutHandler = {this.logoutHandler}/>
        <div style={innerLoginStyle}>
          <LoginView loginHandler = {this.loginHandler} />
        </div>
      </div>
    );
  }

  renderMain() {
    return (
      <div className="MainViewer" style={topStyle}>
        <HeaderView loggedIn={this.state.loggedIn} logoutHandler = {this.logoutHandler}/>
        <div style={innerMainStyle}>
          <SideView />
          <ContentView />
        </div>
      </div>
    );
  }
}

const topStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100vh',
};

const innerMainStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    height: '100vh',
};

const innerLoginStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'gray',
  height: '100vh',
};

export default MainViewer;
