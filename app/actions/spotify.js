import { popWrap } from '../helpers'
import { push, routerActions } from 'react-router-redux'
import { userUpdate } from './user'
import urlLib from 'url'
import qString from 'query-string'
import config from '../../config/app.config'

const BASE_PATH = urlLib.format(config.app.api);

function analyzeSpotify (user) {
  return (dispatch) => {
    popWrap({ 
      method: 'GET',
      url: `${BASE_PATH}/users/${user._id}/evalSpotify`,
      headers: {
        Authorization: `Bearer ${user.accessToken}`
      }
    }, dispatch, userUpdate);
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
