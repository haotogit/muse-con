import { popWrap } from '../helpers'
import { push, routerActions } from 'react-router-redux'

function analyzeSpotify () {
  return (dispatch) => {
    popWrap('get', 'api/evalSpotify')
      .then(resp => {
        // move this error handling to the popwrap helper,
        // otherwise need to handle no session redirect on
        // every request

        if (resp.body.error) {
          console.log('resppp::', resp)
          //dispatch(routerActions.push('/login'))
        } else {
          console.log('evalResponse::', resp)
        }
      })
  }
}

export { analyzeSpotify }
