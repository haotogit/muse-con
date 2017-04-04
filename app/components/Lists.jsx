import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
import { keyMaker } from '../helpers'

const Lists = ({userAuth, events}) => {
  const thirdParty = userAuth[userAuth.searchOpts.currSrc],
        listStyle = {
          listStyleType: 'none',
          paddingLeft: '0'
        }

  return (
    <div className='third-party-widget col-sm-2'>
      <h3>{userAuth.searchOpts.currSrc}</h3>
      {
        thirdParty.artists.map((each, i) => 
          <div key={`${each.name}`} 
            class="panel-group"
            id="accordion"
            role="tablist" 
            aria-multiselectable="true">
            <div class="panel-heading" id={`heading${i}`} role="tab">
              <h4 class="panel-title">
                <a role="button" data-toggle="collapse" data-parent="#accordion" href={`#collapse${i}`} aria-expanded="false" aria-controls={`collapse${i}`}>
                  {each.name}
                </a>
              </h4>
            </div>
            <div id={`collapse${i}`} class="panel-collapse collapse in" role="tabpanel" aria-labelledby={`heading${i}`}>
              <div class="panel-body">
                <ul className='nav nav-stacked'>
                  {
                    events && events[keyMaker(each.name)] ? 
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

export default connect(null, actions)(Lists)
