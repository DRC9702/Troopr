import React, {Component} from 'react'
import { Switch, Route } from 'react-router-dom'
// import LoginView from './LoginView'
import Main_Page from './Main_Page'
import MainViewer from './MainViewer';
import ProfileView from './ProfileView'
import HeaderView from './HeaderView'

class Main extends Component {
    constructor(props){
	super(props);
	this.state = {
	    loggedIn: false,
	};
     }

  render () {
    return (
      <div className="Main">
      <HeaderView />
      <Switch>
      <Route exact path='/'
        render=
          {
            (props) => (
              <MainViewer
                 loggedIn={this.state.loggedIn}
	      />
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
      <Route exact path='/Main_Page' component={Main_Page}/>

    </Switch>
    </div>
	    )
	  }
}

export default Main
