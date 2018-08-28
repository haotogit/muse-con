import React from 'react'
import urlLib from 'url'
import config from '../../server/config/config'
import qString from 'query-string'

const Spotify = (props) => {
  const { actions, userAuth } = props
  let spotify;
  const BASE_PATH = urlLib.format(config.app.api);
  let scope = 'user-read-private user-top-read user-library-read user-read-email user-read-birthdate';

  let query = qString.stringify({
    response_type: 'code',
    client_id: process.env.SPOTIFY_CLIENT_ID,
    client_secret: process.env.SPOTIFY_CLIENT_SECRET,
    scope: scope,
    redirect_uri: config.external.spotify.redirectUri,
    state: `userId=${userAuth._id}`,
  });

  let url = `https://accounts.spotify.com/authorize?${query}`;

  if (userAuth.thirdParties.length !== 0) spotify = userAuth.thirdParties.find(item => item.source === 'spotify');

  return (
    <div className='col-xs-6 col-xs-offset-3'>
      { 
        spotify ? '' :
          <span className='label label-primary'>
            <a href={url} style={{color:'white',textTransform:'uppercase'}}>Link Spotify</a>
          </span>
      }
      <div id='genresGraph'>
        <h3>Top Spotify Genres</h3>
        {
          spotify ?
            <button onClick={() => actions.analyzeSpotify(userAuth)} style={{display:'block', background:'none', border:'none'}}>
              <span className='label label-info'>
                Get Spotify Data
                <i className="fa fa-arrow-circle-right" aria-hidden="true" style={{paddingLeft:'1em'}}></i>
              </span>
            </button>
          : ''
        }
      </div>
    </div>
  )
}

export default Spotify
