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
import Rx from 'rxjs'

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
        <div className='container'>
          <h1>Wilkommen</h1>
          <h4>Need event module, which is calendar and list view</h4>

          <Lists thirdParty={this.props.userAuth.spotify}/>
          <EventContain />
        </div>
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
