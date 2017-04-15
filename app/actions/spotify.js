import { popWrap } from '../helpers'
import { push, routerActions } from 'react-router-redux'
import { userUpdate } from './user'

function analyzeSpotify () {
  return (dispatch) => {
    popWrap('get', 'api/evalSpotify')
      .then(resp => {
        // move this error handling to the popwrap helper,
        // otherwise need to handle no session redirect on
        // every request

        if (resp.body.error) {
          //dispatch(routerActions.push('/login'))
        } else {
          dispatch(userUpdate(resp.body))
        }
      })
  }
}

function toggleArtist (artist, userAuth) {
  let thirdParty = userAuth[userAuth.searchOpts.currSrc],
      currIndex = thirdParty.artists.findIndex(each => artist.name == each.name),
      currItem = userAuth[userAuth.searchOpts.currSrc].artists[currIndex]
  
  userAuth[userAuth.searchOpts.currSrc].artists[currIndex].exclude = !currItem.exclude

  return (dispatch) => {
    dispatch({type:'TOGGLE_ARTIST', payload: userAuth}) 
  }
}

export { analyzeSpotify, toggleArtist }
