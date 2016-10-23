import React from 'react'

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
