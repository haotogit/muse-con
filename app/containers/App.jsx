import React, { Component } from 'react'
import Dashboard from './Dashboard'
import Navigation from './Navigation'
import { connect } from 'react-redux'
import popsicle from 'popsicle'

//popsicle('https://api.soundcloud.com/users/92096540?client_id=3b98ab9c1bbc191c8a3ccb86af57d208').then((res) => console.log(res))
//popsicle('/api').then( res => console.log('res:', res))

const App = ({children, state}) => {
  return (
    <div>
      <Navigation />
      {children}
    </div>
  )
}

function mapStateToProps(state) {
  return {state: state}
}


export default connect(mapStateToProps)(App)
