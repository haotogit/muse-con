import { popWrap } from '../helpers'
import { push, routerActions } from 'react-router-redux'
import { userUpdate } from './user'

function analyzeSpotify (id) {
  return (dispatch) => {
    popWrap('get', `api/users/${id}/evalSpotify`)
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

export { analyzeSpotify }
