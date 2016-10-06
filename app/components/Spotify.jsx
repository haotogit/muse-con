import React from 'react'
import { connect } from 'react-redux'

const Spotify = (props) => {
  const { userAuth, analyzeSpotify } = props
  return (
    <div>
      <a href="/auth-spotify">Link Spotify</a>
      <button onClick={analyzeSpotify}>Evaluate Spotify</button>
    </div>
  )
}

export default Spotify
