import { popWrap } from '../helpers'
import { push, routerActions } from 'react-router-redux'
import { userUpdate } from './user'
import urlLib from 'url'
import config from '../../server/config/config'
import qString from 'query-string'

const BASE_PATH = urlLib.format(config.app.api);

function analyzeSpotify (user) {
  return (dispatch) => {
    popWrap({ method: 'POST', url: `${BASE_PATH}/users/${user._id}/evalSpotify`, body: user.thirdParty[0] }, dispatch)
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

function authSpotify(user) {
  let scope = 'user-read-private user-top-read user-library-read user-read-email user-read-birthdate';

  let url = `https://accounts.spotify.com/authorize?`;

  let query = qString.stringify({
    response_type: 'code',
    client_id: config.external.spotify.clientId,
    client_secret: config.external.spotify.clientSecret,
    scope: scope,
    redirect_uri: `${BASE_PATH}/authSpotify/callback`,
    state: `userId=${user._id}`,
  });
  console.log('fak', query)
  return (dispatch) => {
    popWrap({ 
      method: 'GET', 
      url: `${url}${query}`
    }, dispatch)
    .then(resp => console.log('wow', resp))
  }
}

export { analyzeSpotify, authSpotify }
