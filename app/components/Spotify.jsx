import React from 'react'

const Spotify = (props) => {
  const { analyzeSpotify, spotify } = props
  console.log('eventss', moment)
  console.log('alert', alertify)

  return (
    <div className='row'>
      <a href="/auth-spotify">Link Spotify</a>
      <button onClick={analyzeSpotify}>Evaluate Spotify</button>
      <span className='glyphicon glyphicon-th' id='popover'></span>
      <div id='genresGraph'>
        <div className='header'><h3>Spotify Overall</h3></div>
        <svg></svg>
      </div>
      <div></div>
    </div>
  )
}

export default Spotify
