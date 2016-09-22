import React from 'react'
import { connect } from 'react-redux'
import Spotify from '../components/Spotify'
import { thirdPartyToken } from '../actions'

const User = ({state}) => {
  getThirdPartyToken(state.reducer.userAuth)
  return (
    <div>
      <h1>HOla</h1>
      <Spotify />
    </div>
  )
}

function getThirdPartyToken (user) {
  if (window.location.search) {
    console.log('use::', user)
    console.log('party::', window.location.search)
  }
}

function mapStateToProps(state) {
  return {
    state: state
  }
}

export default connect(mapStateToProps)(User)
