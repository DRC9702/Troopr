import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import ProfileView from './ProfileView';
import HeaderView from './HeaderView';
import HomeView from './HomeView';
import DashboardView from './DashboardView';
import CreateAccountView from './CreateAccountView';
import CreateProfileView from './CreateProfileView';
import EventsView from './EventsView';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      showLoginModal: false,
    };
    // console.log("Constructor");

    this.loginHandler = this.loginHandler.bind(this);
    this.logoutHandler = this.logoutHandler.bind(this);
    this.loginToggleHandler = this.loginToggleHandler.bind(this);
    this.promptLogin = this.promptLogin.bind(this);
    this.depromptLogin = this.depromptLogin.bind(this);
  }

  loginHandler(e) {
    e.preventDefault();
    this.setState({
      loggedIn: true,
    });
  }


  logoutHandler(e) {
    e.preventDefault();
    this.setState({
      loggedIn: false,
    });
  }

  promptLogin(e) {
    console.log('Hi!');
    e.preventDefault();
    this.setState({
      showLoginModal: true,
    });
  }

  depromptLogin(e) {
    console.log('Hi!');
    e.preventDefault();
    this.setState({
      showLoginModal: false,
    });
  }

  loginToggleHandler(e) {
    console.log('Hi!');
    e.preventDefault();
    this.setState(prevState => ({ loggedIn: !prevState.loggedIn }));
  }

  render() {
    return (
      <BrowserRouter>
        <div className="Main">
          <HeaderView
            loggedIn={this.state.loggedIn}
            loginHandler={this.loginHandler}
            promptLoginHandler={this.promptLogin}
            depromptLoginHandler={this.depromptLogin}
            show={this.state.showLoginModal}
          />
          <Switch>
            <Route
              exact
              path="/"
              render={
              props => (
                <HomeView />
              )
            }
            />
            <Route
              exact
              path="/profile"
              render={
                props => (
                  <ProfileView
                    loggedIn={this.state.loggedIn}
                  />
                 )
                }
            />
            <Route
              exact
              path="/dashboard"
              render={
              props => (
                <DashboardView />
              )
            }
            />
            <Route
              exact
              path="/create_account"
              render={
              props => (
                <CreateAccountView />
              )
            }
            />
            <Route
              exact
              path="/create_profile"
              render={
              props => (
                <CreateProfileView />
              )
            }
            />
            <Route
              exact
              path="/profile"
              render={
              props => (
                <ProfileView />
              )
            }
            />
            <Route
              exact
              path="/events"
              render={
              props => (
                <EventsView />
              )
            }
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default Main;