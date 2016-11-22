import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import EventContain from './EventContain'
import * as actionCreators from '../actions'
import { bindActionCreators } from 'redux'
import popsicle from 'popsicle'
import UserTaste from '../components/UserTaste'
import Spotify from '../components/Spotify'
import { loadEvents } from '../actions'
import { locateUser } from '../helpers'

class Dashboard extends Component{
  // to touch nested children of state tree,
  // assign new properties to highest affected level,
  // then reassign to state by using same key

  componentWillMount () {
    // need to replace this, put this at app boot and attach to user obj
    
    if (!this.props.userAuth.lat || !this.props.userAuth.long) {
      locateUser(this.props.userAuth)
        .then(res => this.props.actions.locationFound(res))
    }
  }

  componentDidMount () {
    
  }

  render(){
    return (
      <div className='wrapper'>
        <h1>Wilkommen</h1>
        <h4>Need event module, which is calendar and list view</h4>
        <div className='third-party-widget'>
          <h3>Spotify</h3>
          <ul className='nav nav-tabs' role='tablist'>
            <li role='presentation' className='active'><a href='#artists' aria-controls='artists' role='tab' data-toggle='tab'>Artists</a></li>
            <li role='presentation'><a href='#genres' aria-controls='genres' role='tab' data-toggle='tab'>Genres</a></li>
          </ul>

          <div className='tab-content'>
            <div role='tabpanel' className='tab-pane active' id='artists'>
              {this.props.userAuth.spotify.artists.map(each => <p key={each.name}>{each.name}</p>)}
            </div>
            <div role='tabpanel' className='tab-pane' id='genres'>
              {this.props.userAuth.spotify.genres.map(each => <p key={each.label}>{each.label}</p>)}
            </div>
          </div>
        </div>
        <EventContain />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  userAuth: state.reducer.userAuth
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
