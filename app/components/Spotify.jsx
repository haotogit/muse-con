import React from 'react'

const Spotify = (props) => {
  const { actions , userAuth } = props
  let spotify;

  if (userAuth.thirdParty.length !== 0) spotify = userAuth.thirdParty.find(item => item.source === 'spotify');

  return (
    <div className='col-xs-6 col-xs-offset-3'>
      { 
        spotify ? '' :
          <span className='label label-primary'>
            <a href={`/auth-spotify?userId=${userAuth._id}`} style={{color:'white',textTransform:'uppercase'}}>Link Spotify</a>
          </span>
      }
      <div id='genresGraph'>
        <h3>Top Spotify Genres</h3>
        {
          spotify ?
            <button onClick={actions.analyzeSpotify(userAuth.id)} style={{display:'block', background:'none', border:'none'}}>
              <span className='label label-info'>
                Get Spotify Data
                <i className="fa fa-arrow-circle-right" aria-hidden="true" style={{paddingLeft:'1em'}}></i>
              </span>
            </button>
          : ''
        }
        <svg></svg>
      </div>
    </div>
  )
}

export default Spotify
