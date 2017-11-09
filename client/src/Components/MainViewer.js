import React, { Component } from 'react';
import HeaderView from './HeaderView';
import SideView from './SideView';
import ContentView from './ContentView';
import HomeView from './HomeView';
import Main_Page from './Main_Page'

class MainViewer extends Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: props.loggedIn,
      showLoginModal: props.showLoginModal,
    };
    console.log("Constructor");

    this.loginHandler = this.loginHandler.bind(this);
    this.logoutHandler = this.logoutHandler.bind(this);
    this.loginToggleHandler = this.loginToggleHandler.bind(this);
    this.promptLogin = this.promptLogin.bind(this);
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

  promptLogin(e) {
    console.log("Hi!");
    e.preventDefault();
    this.setState({
      showLoginModal: true,
    })
  }

  loginToggleHandler(e) {
    console.log("Hi!");
    e.preventDefault();
    this.setState((prevState) => {
      return {loggedIn: !prevState.loggedIn};
    });
  }

  render() {
    if(this.state.loggedIn)
      return <Main_Page/>
      // return this.renderMain();
    else
      return this.renderLogin();
  }

  renderLogin() {
    return (
      <div className="MainViewer" style={topStyle}>
        <HeaderView loggedIn={this.state.loggedIn} promptLoginHandler = {this.promptLogin}/>
        <div style={innerLoginStyle}>
          <HomeView loginHandler = {this.loginHandler} show={this.state.showLoginModal}/>
        </div>
      </div>
    );
  }

  renderMain() {
    return (
      <div className="MainViewer" style={topStyle}>
        <HeaderView loggedIn={this.state.loggedIn} logoutHandler = {this.loginToggleHandler}/>
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
  alignItems: 'flex-start',
  backgroundColor: 'white',
  height: '100vh',
};

export default MainViewer;
