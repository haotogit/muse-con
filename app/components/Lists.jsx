import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
import { keyMaker } from '../helpers'

const Lists = (props) => {
  const { userAuth, events, actions } = props
  const thirdParty = userAuth[userAuth.searchOpts.currSrc],
        listStyle = {
          listStyleType: 'none',
          paddingLeft: '0'
        }
  console.log('ev', props)

  let isSelected = thirdParty.artists.find(each => each.exclude)

  let btnSelector = (evObj) => {
    if (evObj.exclude) {
      return <i className="fa fa-plus" 
                aria-hidden="true"
                onClick={() => actions.toggleArtist(evObj, userAuth)}></i>
    } else return <i className="fa fa-minus"
                     aria-hidden="true"
                     onClick={() => actions.toggleArtist(evObj, userAuth)}></i> 
  } 

  let btnStyle = {
    background: 'none',
    padding:'0.5em',
    position: 'inline-block',
    marginTop: '2%',
    marginLeft: '10%',
    border: 'none',
    textTransform: 'uppercase'
  }

  return (
    <div className='third-party-widget col-sm-2'>
      <h3>{userAuth.searchOpts.currSrc}</h3>
      <button onClick={() => actions.loadEvents(userAuth)} style={btnStyle}>
        Search
        <i className="fa fa-arrow-circle-right" aria-hidden="true" style={{paddingLeft:'1em'}}></i>
      </button>
      
      <hr></hr>
      {
        thirdParty.artists.map((each, i) => 
          <div key={`${each.name}`} 
            className={`panel-group${events && events[keyMaker(each.name)] && events[keyMaker(each.name)].length > 0 ? '' : ' no-evs'}`}
            id='accordion'
            role='tablist' 
            aria-multiselectable='true'>
            <div className='panel-heading' id={`heading${i}`} role='tab'>
              <h4 className='panel-title'>
                <a role='button'
                   data-toggle='collapse'
                   data-parent='#accordion' 
                   href={`#collapse${i}`} 
                   aria-expanded='false' 
                   aria-controls={`collapse${i}`}
                   >
                  {each.name}
                </a>
              </h4>
              {/* btnSelector(each) */}
              
            </div>
            <div id={`collapse${i}`} className='panel-collapse collapse' role='tabpanel' aria-labelledby={`heading${i}`}>
              <div className='panel-body' style={{border:'none'}}>
                <ul className='nav nav-stacked'>
                  {
                    events && events[keyMaker(each.name)] && events[keyMaker(each.name)].length > 0 ? 
                    events[keyMaker(each.name)].map((eachEv, i) => <li key={`#${keyMaker(each.name)}${i}`}><a href={`#${keyMaker(each.name)}${i}`}>{eachEv.name}</a></li>) :
                    ''
                  }
                </ul>
              </div>
            </div>
            
          </div>
        )
      }
    </div> 
  )
}

export default Lists
