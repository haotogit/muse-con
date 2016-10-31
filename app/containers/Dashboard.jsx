import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import EventContain from './EventContain'
import * as actionCreators from '../actions'
import { bindActionCreators } from 'redux'
import popsicle from 'popsicle'
import UserTaste from '../components/UserTaste'
import Spotify from '../components/Spotify'
import { getEvents } from '../helpers'

class Dashboard extends Component{
  // to touch nested children of state tree,
  // assign new properties to highest affected level,
  // then reassign to state by using same key
  
  componentWillMount () {
    // need to replace this
    if ('geolocation' in navigator && !this.props.userAuth.lat) {
      navigator.geolocation.getCurrentPosition((pos) => {
        let latLong = {
          lat: pos.coords.latitude,
          long: pos.coords.longitude
        }
        let user = Object.assign(this.props.userAuth, latLong)

        this.props.actions.currUserLocation(user)
        getEvents(user)
      })
    } else {
      getEvents(this.props.userAuth)
    }
  }

  componentDidMount () {
    
  }

  render(){
    return (
      <div className='container'>
        <h1>Wilkommen</h1>
        <h4>Need event module, which is calendar and list view</h4>
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
