import * as actions from '../actions'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import EventBlock from '../components/EventBlock'
import Lists from '../components/Lists'

class EventContain extends Component {
  render () {
    let styles = {
      height: '30em',
      padding: '1em',
      overflow: 'auto',
      border: '2px solid black'
    },
    btnStyle = {
      position: 'fixed'
    }

    return (
      <div className='row' style={styles}>
        <Lists {...this.props}/>

        <button onClick={() => this.props.actions.loadEvents(this.props.userAuth)} style={btnStyle}>hello</button>

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
