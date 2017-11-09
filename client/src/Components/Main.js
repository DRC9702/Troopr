import React, {Component} from 'react'
import { Switch, Route } from 'react-router-dom'
// import LoginView from './LoginView'
import Main_Page from './Main_Page'
import MainViewer from './MainViewer'
import ProfileView from './ProfileView'
import HeaderView from './HeaderView'
import LoginView from './LoginView'
import DashboardView from './DashboardView'
import Create_Account from './Create_Account';


class Main extends Component {
    constructor(props){
	super(props);
	this.state = {
	    loggedIn: false,
	    showLoginModal: false,
	};
	//console.log("Constructor");

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

  render () {
    return (
      <div className="Main">
      <HeaderView loggedIn={this.state.loggedIn} promptLoginHandler = {this.promptLogin}/>
      <Switch>
      <Route exact path='/'
        render=
          {
            (props) => (
	      <LoginView loginHandler = {this.loginHandler} show={this.state.showLoginModal}/>

            )
          }
      />
      <Route exact path='/me'
        render=
	  {
	    (props) => (
              <ProfileView
	      loggedIn={this.state.loggedIn}
              />
	     )
	  }
      />
      <Route exact path='/home'
        render=
	  {
	  (props) => (
       	     <DashboardView />
	         )
          }
      />

      <Route exact path='/Main_Page' component={Main_Page}/>
      <Route exact path='/Create_Account' component={Create_Account}/>
    </Switch>
    </div>
	    )
	  }
}

export default Main
