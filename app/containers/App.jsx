import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Dashboard from './Dashboard'
import Navigation from './Navigation'
import { connect } from 'react-redux'
import { logout } from '../actions'

class App extends Component {
  render(){
    //let { userAuth } = this.props
    // current fix to prevent scrolling out view when
    // clicking anchor

    let styles = {
      marginTop: '10%',
      position:'relative',
      padding:'0 2em'
    }

    return(
      <div className='container-fluid' style={styles}>
        <Navigation {...this.props}/>
        { this.props.children }
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.object
}

function mapStateToProps(state) {
  return {
    userAuth: state.user.userAuth,
    loading: state.main.loading
  }
}

export default connect(mapStateToProps, { logout })(App)
