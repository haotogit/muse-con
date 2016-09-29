import React from 'react'
import { connect } from 'react-redux'
import { push, routerActions } from 'react-router-redux'
import popsicle from 'popsicle'
import { popWrap } from '../helpers'
import { bindActionCreators } from 'redux'

const Spotify = ({analyzeSpotify}) =>{
  return (
    <div>
      <a href="/auth-spotify">Link Spotify</a>
      <button onClick={analyzeSpotify}>Evaluate Spotify</button>
    </div>
  )
}

function analyzeSpotify () {
  return (dispatch) => {
    popWrap('get', 'api/evalSpotify')
      .then(resp => {
        // move this error handling to the popwrap helper,
        // otherwise need to handle no session redirect on
        // every request

        if (resp.body.error) {
          console.log('resppp::', resp)
          dispatch(routerActions.push('/login'))
        } else {
          console.log('authed::', resp)
        }
      })
  }
}

function mapDispatchToProps(dispatch) {
  return {
    analyzeSpotify: bindActionCreators(analyzeSpotify, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(Spotify)
