import React, { Component } from 'react'
import { connect } from 'react-redux'
import Spotify from '../components/Spotify'
import { bindActionCreators } from 'redux'
import { analyzeSpotify } from '../actions'

class User extends Component {
  constructor (props) {
    super(props)
  }
  
  render () {
    return (
      <div>
        <h1>HOla</h1>
        <Spotify 
          currUser={this.props.userAuth} 
          analyzeSpotify={this.props.analyzeSpotify}/>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    state: state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    analyzeSpotify: bindActionCreators(analyzeSpotify, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
