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
    return (
      <div>
        
        <div className='row'>
            
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  userAuth: state.user.userAuth
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
