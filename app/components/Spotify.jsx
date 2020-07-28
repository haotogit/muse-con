import React from 'react'
import urlLib from 'url'
import qString from 'query-string'
import config from '../../config/app.config'
const BASE_PATH = urlLib.format(config.app.api);

const Spotify = (props) => {
  const { actions, userAuth } = props
  let spotify;

  if (userAuth.thirdParties && userAuth.thirdParties.length !== 0) spotify = userAuth.thirdParties.find(item => item.source === 'spotify');

  return (
    <div className='row'>
      { 
        spotify ? '' :
          <span className='label label-primary'
            style={{cursor:'pointer'}}>
            {/* change this link to remove all client creds */}
						<a style={{color:'white',textTransform:'uppercase'}} href={`${BASE_PATH}/linkSpotify?ctx=${userAuth._id}`}>Link Spotify</a>
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
