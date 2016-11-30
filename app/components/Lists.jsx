import React from 'react'

const Lists = (props) => {
  console.log('props', props)
  const { thirdParty } = props

  return (
    <div className='third-party-widget'>
      <h3>Spotify</h3>
      <ul className='nav nav-tabs' role='tablist'>
        <li role='presentation' className='active'><a href='#artists' aria-controls='artists' role='tab' data-toggle='tab'>Artists</a></li>
        <li role='presentation'><a href='#genres' aria-controls='genres' role='tab' data-toggle='tab'>Genres</a></li>
      </ul>

      <div className='tab-content'>
        <div role='tabpanel' className='tab-pane active' id='artists'>
          {thirdParty.artists.map(each => <p key={each.name}>{each.name}</p>)}
        </div>
        <div role='tabpanel' className='tab-pane' id='genres'>
          {thirdParty.genres.map(each => <p key={each.label}>{each.label}</p>)}
        </div>
      </div>
    </div> 
  )
}

export default Lists
