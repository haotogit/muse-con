import React, { Component, PropTypes } from 'react'
import Dashboard from './Dashboard'
import Navigation from './Navigation'
import { connect } from 'react-redux'
import popsicle from 'popsicle'

class App extends Component {
  render(){
    let { userAuth } = this.props
    // current fix to prevent scrolling out view when
    // clicking anchor

    let styles = {
      marginTop: '5%',
      position:'relative',
      padding:'0 2em'
    }

    return(
      <div className='container-fluid' style={styles}>
        <Navigation />
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
    userAuth: state.user.userAuth
  }
}

export default connect(mapStateToProps)(App)
