import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import ProfileView from './ProfileView';
import HeaderView from './HeaderView';
import HomeView from './HomeView';
import DashboardView from './DashboardView';
import CreateAccountView from './CreateAccountView';
import CreateProfileView from './CreateProfileView';
import EditProfileView from './EditProfileView';
import CreateEventView from './CreateEventView';
import EventsView from './EventsView';
import Matching from './Matching';

require('../styles/Main.css');

class Main extends Component {
  constructor(props) {
    super(props);
    // console.log("Constructor");
    this.resize = this.resize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resize() {
    this.forceUpdate();
  }

  render() {
    return (
      <div className="Main" style={{ height: window.innerHeight, width: window.innerWidth }} >
        <BrowserRouter>
          <div id="BrowserRouterInnerDiv">
            <HeaderView
              show={false}
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
                path="/edit_profile"
                render={
              props => (
                <EditProfileView />
              )
            }
              />
              <Route
                exact
                path="/create_event"
                render={
              props => (
                <CreateEventView />
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
                path="/events/:searchKey"
                component={EventsView}
              />
              <Route
                path="/matches/:event"
                component={Matching}
              />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}


export default Main;
