const rp = require('request-promise');
const qString = require('query-string');
const popsicle = require('popsicle');

const helpers = require('../library/helpers');
const urlLib = require('url');
const config = require('../../server/config/config');

const BASE_PATH = urlLib.format(config.app.url);
const API_BASE_PATH = urlLib.format(config.app.api);

module.exports.authSpotify = (req, res) => {
  let scope = 'user-read-private user-top-read user-library-read user-read-email user-read-birthdate';

  res.redirect('https://accounts.spotify.com/authorize?' + 
  qString.stringify({
    response_type: 'code',
    client_id: process.env.SPOTIFY_CLIENT_ID,
    client_secret: process.env.SPOTIFY_CLIENT_SECRET,
    scope: scope,
    redirect_uri: `${BASE_PATH}/auth-spotify/callback`,
    state: `userId=${req.query.userId}`,
  }));
};

module.exports.spotifyCallback = (req, res) => {
  const { code, state } = req.query;
  const authParam = new Buffer(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64');
  const userId = state.split('=')[1];

  let authOptions = {
    method: 'POST',
    uri: 'https://accounts.spotify.com/api/token',
    form: {
      code,
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': `Basic ${authParam}` 
    }
  }

  rp(authOptions)
    .then((response) => {
      const { access_token, refresh_token, expires_in } = JSON.parse(response);
      let thirdPartyOpts = {
        method: 'POST',
        // need to change this to BASE_PATH
        uri: `${API_BASE_PATH}/users/${userId}/thirdParty`,
        body: {
          source: 'spotify',
          accessToken: access_token,
          refreshToken: refresh_token,
          expiresIn: expires_in
        },
        json: true
      };

      rp(thirdPartyOpts)
        .then((resp) => {
          res.redirect('/login');
        })
    })
    .catch((err) => {
      res.json(err);
    })
}

  
  function keyMaker (str) {
      return str.split(/\-|\s/).length === 1 ? str : str.split(/\-|\s/).map((each, i) => i === 0 ? each : each.replace(each[0], (match) => match.toUpperCase())).join('')
  }

  function sortArr (a, b) {
    if (a.value > b.value) {
      return -1
    }

    if (a.value < b.value) {
      return 1
    }

    return 0
  }

module.exports.evalSpotify = (req, res) => {
  let spotifyObj = req.body;
  // change this to look at tracks too
  let spotifyOpts = {
    method: 'get',
    url: 'https://api.spotify.com/v1/me/top/artists?limit=50',
    headers: {
      Authorization: `Bearer ${spotifyObj.accessToken}`
    }
  }

  helpers.spotifyRequestResolver(spotifyObj, spotifyOpts)
    .then(data => {
      let top10;
      let thirdPartyObj = {};
      let dataObj = data.body.items;
      let genres = [];

      thirdPartyObj.artists = dataObj.map(artist => {
        let currArtist = {};
        artist.genres.forEach((each, i) => {
          let genreKey = keyMaker(each),
            genre,
            genreIndex,
            artistIndex

          if (genres.find((ea) => ea.label === genreKey)) {
            genreIndex = genres.findIndex((ea) => ea.label === genreKey)
            genres[genreIndex].value++
          } else {
            genre = {
              label: genreKey,
              value: 1,
            }

            genres.push(genre);
          }
        });

        currArtist = {
          name: artist.name,
          genres: artist.genres,
          image: artist.images,
          popularity: artist.popularity,
          externalId: artist.id,
          externalUri: artist.uri
        };
        return currArtist;
      });

      thirdPartyObj.genres = genres.sort(sortArr);
      thirdPartyObj.top10 = genres.slice(0, 10)

      return popsicle.request({
        method: 'PUT',
        url: `${API_BASE_PATH}/users/${spotifyObj.userId}/thirdParty/${spotifyObj._id}`,
        body: thirdPartyObj
      })
      .then((resp) => {
        res.json(resp);
      });
    })
    .catch(err => {
      throw new Error(`error requesting spotify data, error: ${err.message}`);
    });
};
