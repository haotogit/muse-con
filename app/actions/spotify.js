import { popWrap } from '../helpers'
import { userUpdate } from './user'
import urlLib from 'url'
import qString from 'query-string'
import config from '../../config/app.config'

const BASE_PATH = urlLib.format(config.app.api);

function analyzeSpotify (user) {
  return (dispatch) => {
    dispatch({ type: 'REQUESTING_SPOTIFY_DATA' });
    popWrap({ 
      method: 'GET',
      url: `${BASE_PATH}/users/${user._id}/evalSpotify`,
      headers: {
        Authorization: `Bearer ${user.accessToken}`
      },
		}, dispatch)
		.then(updated => {
			dispatch(userUpdate(Object.assign({}, user, updated)))
		});
  }
}

function authSpotify(user) {
  let opts = {
    method: 'GET',
    url: `${BASE_PATH}/users/authSpotify`,
    headers: {
      Authorization: `Bearer ${user.accessToken}`
    }
  };

  return (dispatch) => {
    popWrap(opts, dispatch, userUpdate);
  }
}

export { analyzeSpotify, authSpotify }
