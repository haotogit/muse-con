import * as actions from '../actions'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import EventBlock from '../components/EventBlock'
import Lists from '../components/Lists'
import LinearProgress from 'material-ui/LinearProgress'

class EventContain extends Component {

  componentWillReceiveProps (props) {
    
  }

  componentWillMount() {
    let currList = this.props.userAuth.thirdParties[0][this.props.userAuth.searchOpts.by];
    this.props.dispatch(actions.setSearchList(currList))
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
    events: state.event.events,
    loading: state.event.loading,
    searchList: state.event.searchList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventContain)
