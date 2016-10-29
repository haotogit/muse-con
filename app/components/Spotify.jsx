import React from 'react'

const Spotify = (props) => {
  const { analyzeSpotify, spotify } = props

  return (
    <div>
      <a href="/auth-spotify">Link Spotify</a>
      <button onClick={analyzeSpotify}>Evaluate Spotify</button>
      <div id='genresGraph'>
        <div className='header'><h3>Top Overall</h3></div>
        <svg></svg>
      </div>
    </div>
  )
}

export default Spotify
