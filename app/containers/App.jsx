import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router'
import { Switch, BrowserRouter } from 'react-router-dom'
import Dashboard from './Dashboard'
import Navigation from './Navigation'
import Login from './Login'
import EventContain from './EventContain'
import UserSettings from './User'
import Authorizer from './Authorizer'
import { logout } from '../actions'

class App extends Component {
  render(){
    //let { userAuth } = this.props
    // current fix to prevent scrolling out view when
    // clicking anchor

    let styles = {
      position:'relative',
      padding:'0 2em'
    }

    return(
      <div className='container-fluid' style={styles}>
        <Navigation {...this.props}/>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact={true} component={Authorizer(Dashboard)} />
            <Route path="/explore" component={Authorizer(EventContain)} />
            <Route path="/user" component={Authorizer(UserSettings)} />
            <Route path="/login" component={Login} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

//App.propTypes = {
//  children: PropTypes.object
//}

//function mapStateToProps(state) {
//  return {
//    userAuth: state.user.userAuth,
//    loading: state.main.loading
//  }
//}

export default connect(null, { logout })(App)
//export default App
