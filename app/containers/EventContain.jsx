import * as actions from '../actions'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import EventBlock from '../components/EventBlock'
import Lists from '../components/Lists'

class EventContain extends Component {
  componentWillReceiveProps (props) {
    console.log('hello', props)
  }

  render () {
    let styles = {
      height: '39em',
      overflow: 'auto',
      border: '2px solid inset'
    }
    

    return (
      <div className='row ev-contain' style={styles}>
        <Lists {...this.props}/>
        
        {this.props.events ? <EventBlock events={this.props.events} /> : ''}
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
