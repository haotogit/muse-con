import React, { Component } from 'react'
import { connect } from 'react-redux'
import Dashboard from './Dashboard'
import Navigation from './Navigation'
import { logout } from '../actions'

class App extends Component {
  componentWillReceiveProps(nextProps) {
  }
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
