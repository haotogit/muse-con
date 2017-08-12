import React from 'react'

const Spotify = (props) => {
  const { actions , userAuth, spotify } = props

  return (
    <div className='col-xs-6 col-xs-offset-3'>
      { 
        userAuth[userAuth.searchOpts.currSrc].access_token ? '' :
          <span className='label label-primary'>
            <a href="/auth-spotify" style={{color:'white',textTransform:'uppercase'}}>Link Spotify</a>
          </span>
      }
      <div id='genresGraph'>
        <h3>Top Spotify Genres</h3>
        {
          userAuth[userAuth.searchOpts.currSrc].access_token ?
            <button onClick={actions.analyzeSpotify} style={{display:'block', background:'none', border:'none'}}>
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
