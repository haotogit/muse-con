import React, { Component } from 'react'
import { connect } from 'react-redux'
import Spotify from '../components/Spotify'
import { thirdPartyToken } from '../actions'
import qString from 'query-string'

class User extends Component {
  
  componentDidMount () {
    console.log('herro::', this)
  }

  render () {
    return (
      <div>
        <h1>HOla</h1>
        <Spotify />
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    state: state
  }
}

export default connect(mapStateToProps)(User)
