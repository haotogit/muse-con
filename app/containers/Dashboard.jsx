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
import Badge from 'material-ui/Badge';

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
      if (user.thirdParty.length === 0) {
        return <span className='label label-warning'><Link to='/user'>Link your Spotify Account</Link></span>
      } else {
        let spotify = user.thirdParties[0];
        if (spotify && spotify.artists.length === 0) return <span className='label label-info'><Link to='/user'>Get Spotify Data</Link></span>

        if (this.props.events.length < 1) return <span className='label label-info'><Link to='/explore'>Get Events</Link></span>
        else return <h6 style={{textTransform:'lowercase',marginLeft:'2%'}}>Upcoming Events<Badge badgeContent={this.props.events.length} primary={true} badgeStyle={{right:'1em'}}></Badge></h6>
      }
    } 

    return (
      <div className='row content-contain'>
        {checkUser(this.props.userAuth)}
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
