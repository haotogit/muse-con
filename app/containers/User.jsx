import React, { Component } from 'react'
import { connect } from 'react-redux'
import Spotify from '../components/Spotify'
import { thirdPartyToken } from '../actions'
import qString from 'query-string'

class User extends Component {
  
  componentDidMount (props) {
    this.getThirdPartyToken()
  }

  render () {
    return (
      <div>
        <h1>HOla</h1>
        <Spotify />
      </div>
    )
  }

  getThirdPartyToken () {
    let currUser = Object.assign(this.props.userAuth, qString.parse(window.location.search))

    console.log('currUser:', currUser)
    console.log('props:', this.props)
    if (window.location.search) {
      //this.props.dispatch(thirdPartyToken())
    }
  }
}



function mapStateToProps(state) {
  return {
    state: state
  }
}

export default connect(mapStateToProps)(User)
