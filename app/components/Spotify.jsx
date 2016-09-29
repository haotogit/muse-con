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
  console.log('rannnnn')
    popWrap('get', 'api/evalSpotify')
      .then(resp => {
        if (resp.body.error) {
          dispatch(routerActions.push('/login'))
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
