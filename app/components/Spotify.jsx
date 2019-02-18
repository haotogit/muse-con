import React from 'react'
import urlLib from 'url'
import qString from 'query-string'
import config from '../../config/app.config'

const Spotify = (props) => {
  const { actions, userAuth } = props
  let spotify;
  const BASE_PATH = urlLib.format(config.app.api);
  let scope = 'user-read-private user-top-read user-library-read user-read-email user-read-birthdate';

  // remove this and change it to request from server
  let query = qString.stringify({
    response_type: 'code',
    client_id: process.env.SPOTIFY_CLIENT_ID,
    client_secret: process.env.SPOTIFY_CLIENT_SECRET,
    scope: scope,
    redirect_uri: config.external.spotify.redirectUri,
    state: `userId=${userAuth._id}`,
  });

  let url = `https://accounts.spotify.com/authorize?${query}`;

  if (userAuth.thirdParties && userAuth.thirdParties.length !== 0) spotify = userAuth.thirdParties.find(item => item.source === 'spotify');

  return (
    <div className='row'>
      { 
        spotify ? '' :
          <span className='label label-primary'
            style={{cursor:'pointer'}}>
            {/* change this link to remove all client creds */}
            <a style={{color:'white',textTransform:'uppercase'}} href={url}>Link Spotify</a>
          </span>
      }
      <div id='genresGraph'>
        {
          spotify ?
            <button onClick={() => actions.analyzeSpotify(userAuth)} style={{display:'block', background:'none', border:'none'}}>
              <span className='label label-info'>
                Get Spotify Data
              </span>
            </button>
          : ''
        }
      </div>
    </div>
  )
}

export default Spotify
