import * as actions from '../actions'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import EventBlock from '../components/EventBlock'
import Lists from '../components/Lists'

class EventContain extends Component {
  componentWillReceiveProps (props) {
  }

  render () {

    return (
      <div className='row content-contain'>
        <Lists {...this.props}/>
        
        {this.props.events ? <EventBlock {...this.props} /> : ''}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userAuth: state.user.userAuth,
    events: state.event.events
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventContain)
