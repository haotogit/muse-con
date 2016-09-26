import React from 'react'
import popsicle from 'popsicle'
import { popWrap } from '../helpers'

const Spotify = () =>{
  return (
    <div>
      <a href="/auth-spotify">Link Spotify</a>
      <button onClick={analyzeSpotify}>Evaluate Spotify</button>
    </div>
  )
}

function analyzeSpotify () {
  popWrap('get', 'api/evalSpotify')
}

export default Spotify
