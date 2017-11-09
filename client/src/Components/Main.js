import React from 'react'
import { Switch, Route } from 'react-router-dom'
// import LoginView from './LoginView'
import Main_Page from './Main_Page'
import MainViewer from './MainViewer';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/'
        render=
          {
            (props) => (
              <MainViewer
                 loggedIn={false}
                 showLoginModal={false} 
              />
            )
          }
      />
      <Route exact path='/Main_Page' component={Main_Page}/>

    </Switch>
  </main>
)

export default Main
