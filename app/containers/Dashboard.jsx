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
import Lists from '../components/Lists'
import Navbar from '../components/Navbar'
import EventBlock from '../components/EventBlock'
import { Link } from 'react-router'

class Dashboard extends Component{
  // to touch nested children of state tree,
  // assign new properties to highest affected level,
  // then reassign to state by using same key
  
  componentWillMount () {
    if (!this.props.userAuth.lat || !this.props.userAuth.long) {
      locateUser(this.props.userAuth)
        .then(res => {
          this.props.actions.locationFound(res)
        })
    }
  }

  componentDidMount () {
    
  }

  render(){
    let checkUser = (user) => {
      if (!user.spotify.access_token) {
        return <Link to='/user'>Link your Spotify Account</Link>
      } else {
        if (user.spotify.artists.length < 1) return <Link to='/user'>Get Spotify Data</Link>

        if (this.props.events.length < 1) return <Link to='/explore'>Get Events</Link>
        else return <h4 style={{textTransform:'uppercase'}}>My Upcoming Events</h4>
      }
    } 

    return (
      <div style={{marginTop:'5%'}}>
        <div className='row'>
          {checkUser(this.props.userAuth)}
        </div>
        <div className='row'>
          <EventBlock {...this.props}/> 
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  userAuth: state.user.userAuth,
  events: state.user.userAuth.events
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
