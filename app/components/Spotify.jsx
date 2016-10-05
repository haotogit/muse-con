import React from 'react'
import { connect } from 'react-redux'
import { analyzeSpotify } from '../actions'
import { bindActionCreators } from 'redux'

const Spotify = ({analyzeSpotify}) =>{
  return (
    <div>
      <a href="/auth-spotify">Link Spotify</a>
      <button onClick={analyzeSpotify}>Evaluate Spotify</button>
    </div>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    analyzeSpotify: bindActionCreators(analyzeSpotify, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(Spotify)
