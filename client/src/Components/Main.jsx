import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import axios from 'axios';
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
import TeamView from './TeamView';

require('../styles/Main.css');

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
    // console.log("Constructor");
    this.resize = this.resize.bind(this);
    this.checkLoggedIn = this.checkLoggedIn.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  componentWillMount() {
    this.checkLoggedIn();
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  checkLoggedIn() {
    axios.post('/check_login')
      .then((response) => {
        // console.log(response);
        this.setState({ isLoggedIn: response.data.login });
      }).catch((error) => {
        console.log(error); // eslint-disable-line no-console
        console.log('Failed To Check If Online'); // eslint-disable-line no-console
      });
  }

  logOut() {
    axios.get('/logout')
      .then((response) => {
        if (response.data.success) {
          window.location = '/';
          this.setState({ isLoggedIn: false });
        } else {
          console.log('Failed to Logout'); // eslint-disable-line no-console
        }
      }).catch((error) => {
        console.log('Failed to Logout'); // eslint-disable-line no-console
        console.log(error); // eslint-disable-line no-console
      });
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
              isLoggedIn={this.state.isLoggedIn}
              logoutHandler={this.logOut}
            />
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <HomeView {...props} />
                )}
              />
              <Route
                exact
                path="/dashboard"
                render={props => (
                  <DashboardView {...props} />
                )}
              />
              <Route
                exact
                path="/create_account"
                render={props => (
                  <CreateAccountView {...props} />
                )}
              />
              <Route
                exact
                path="/create_profile"
                render={props => (
                  <CreateProfileView {...props} />
                )}
              />
              <Route
                exact
                path="/edit_profile"
                render={props => (
                  <EditProfileView {...props} />
                )}
              />
              <Route
                exact
                path="/create_event"
                render={props => (
                  <CreateEventView {...props} />
                )}
              />
              <Route
                exact
                path="/profile"
                render={props => (
                  <ProfileView {...props} />
                )}
              />
              <Route
                path="/events/:searchKey"
                component={EventsView}
              />
              <Route
                path="/matches/:event"
                component={Matching}
              />
              <Route
                path="/team/:event"
                component={TeamView}
              />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}


export default Main;
