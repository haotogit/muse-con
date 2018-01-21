import { popWrap } from '../helpers'
import { push, routerActions } from 'react-router-redux'
import { userUpdate } from './user'

function analyzeSpotify (user) {
  console.log('use', user)
  return (dispatch) => {
    popWrap({ method: 'post', url: `api/users/${user._id}/evalSpotify`, body: user.thirdParty[0] }, dispatch, userUpdate)
    //  .then(resp => {
    //    // move this error handling to the popwrap helper,
    //    // otherwise need to handle no session redirect on
    //    // every request

    //    if (resp.body.error) {
    //      //dispatch(routerActions.push('/login'))
    //    } else {
    //      dispatch(userUpdate(resp.body))
    //    }
    //  })
  }
}

export { analyzeSpotify }
