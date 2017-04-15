import React from 'react'

const Spotify = (props) => {
  const { analyzeSpotify, user, spotify } = props
  console.log('usah', user)

  return (
    <div className='col-xs-6'>
      { 
        user.spotify.access_token ? '' :
          <a href="/auth-spotify">Link Spotify</a>
      }
      <button onClick={analyzeSpotify}>Get Spotify Data</button>
      <span className='glyphicon glyphicon-th' id='popover'></span>
      <div id='genresGraph'>
        <div className='header'><h3>Top Spotify Genres</h3></div>
        <svg></svg>
      </div>
    </div>
  )
}

export default Spotify
