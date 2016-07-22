import React, { Component } from 'react'
import Dashboard from './Dashboard'
import Navigation from './Navigation'
import { connect } from 'react-redux'
import popsicle from 'popsicle'

class App extends Component {

  render(){
    return(
      <div>
        <Navigation />
        { this.props.children }
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log('@app: ', state)
  return {state: state}
}


export default connect(mapStateToProps)(App)
