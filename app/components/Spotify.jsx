import React from 'react'

const Spotify = (props) => {
  const { actions, userAuth } = props
  let spotify;
  if (userAuth.thirdParties.length !== 0) spotify = userAuth.thirdParties.find(item => item.source === 'spotify');
  return (
    <div className='row'>
      { 
        spotify ? '' :
          <span className='label label-primary'>
            <a style={{color:'white',textTransform:'uppercase'}} onClick={() => actions.authSpotify(userAuth)}>Link Spotify</a>
          </span>
      }
      <div id='genresGraph'>
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
