import React from 'react'
import { connect } from 'react-redux'
import Spotify from '../components/Spotify'

const User = () => {
  return (
    <div>
      <h1>HOla</h1>
      <Spotify />
    </div>
  )
}

function mapStateToProps(state) {
  return {
    state: state
  }
}

export default connect(mapStateToProps)(User)
