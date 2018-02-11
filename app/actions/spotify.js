import { popWrap } from '../helpers'
import { push, routerActions } from 'react-router-redux'
import { userUpdate } from './user'
import urlLib from 'url'
import config from '../../server/config/config'

const BASE_PATH = urlLib.format(config.app.url);

function analyzeSpotify (user) {
  return (dispatch) => {
    popWrap({ method: 'post', url: `${BASE_PATH}/users/${user._id}/evalSpotify`, body: user.thirdParty[0] }, dispatch)
      .then((resp) => {
        user.thirdParty[0] = resp.body;
        dispatch(userUpdate(user));
      });
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
