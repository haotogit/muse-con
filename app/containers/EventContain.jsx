import * as actions from '../actions'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import EventBlock from '../components/EventBlock'
import Lists from '../components/Lists'

class EventContain extends Component {
  render () {
    let styles = {
      height: '39em',
      overflow: 'auto',
      border: '2px solid inset'
    },
    btnStyle = {
      background: 'none',
      padding:'0.5em',
      position: 'inline-block',
      marginTop: '2%',
      marginLeft: '10%',
      border: 'none',
      textTransform: 'uppercase'
    }

    return (
      <div className='row ev-contain' style={styles}>
        <button onClick={() => this.props.actions.loadEvents(this.props.userAuth)} style={btnStyle}>Search</button>
        <i className="fa fa-arrow-circle-right" aria-hidden="true"></i>
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
