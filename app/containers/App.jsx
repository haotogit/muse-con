import React, { Component, PropTypes } from 'react'
import Dashboard from './Dashboard'
import Navigation from './Navigation'
import { connect } from 'react-redux'
import popsicle from 'popsicle'

class App extends Component {

  render(){
    let { userAuth } = this.props.state.reducer
    return(
      <div id="container">
        {
          userAuth ? <Navigation /> : ''
        }
        { this.props.children }
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.object
}

function mapStateToProps(state) {
  return {state: state}
}

export default connect(mapStateToProps)(App)
