import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import LinearProgress from 'material-ui/LinearProgress'
import * as actionCreators from '../actions'
import EventBlock from '../components/EventBlock'
import Lists from '../components/Lists'

class EventContain extends Component {

  componentWillReceiveProps (props) {
    
  }

  componentWillMount() {
    //let currList = this.props.userAuth.thirdParties[0][this.props.userAuth.searchOpts.by];
    //this.props.dispatch(actions.setSearchList(currList))
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
const mapStateToProps = (state) => ({
  events: state.event.events,
  searchList: state.event.searchList
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(EventContain)
