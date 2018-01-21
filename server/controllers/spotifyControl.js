const rp = require('request-promise');
const qString = require('query-string');
const popsicle = require('popsicle');

module.exports.authSpotify = (req, res) => {
  let scope = 'user-read-private user-top-read user-library-read user-read-email user-read-birthdate';

  res.redirect('https://accounts.spotify.com/authorize?' + 
  qString.stringify({
    response_type: 'code',
    client_id: process.env.SPOTIFY_CLIENT_ID,
    client_secret: process.env.SPOTIFY_CLIENT_SECRET,
    scope: scope,
    redirect_uri: 'http://localhost:8080/auth-spotify/callback',
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
      const { access_token } = JSON.parse(response);
      let thirdPartyOpts = {
        method: 'POST',
        uri: `http://localhost:8087/api/v1/users/${userId}/thirdParty`,
        body: {
          source: 'spotify',
          accessToken: access_token,
          refreshToken: response.refresh_token,
          expiresIn: response.expires_in
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
  const authParam = new Buffer(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64');

  let spotifyObj = req.body;
  let opts = {
    method: 'get',
    url: 'https://api.spotify.com/v1/me/top/artists?limit=50',
    headers: {
      Authorization: `Bearer ${spotifyObj['access_token']}`
    }
  }
  let refresherOpts;

  popsicle.request(opts)
    .then((res) => {
      // function makes request to refresher endpoint, posts to api to save new token,
      // returns new token then remake original request.
      console.log('===', opts)
      console.log('yay', res)
      if (res.body.error && res.body.error.message === 'The access token expired') {
        refresherOpts = {
          method: 'post',
          url: 'https://accounts.spotify.com/api/token',
          headers: {
            Authorization: `Basic ${authParam}`,
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: {
            grant_type: 'refresh_token',
            refresh_token: spotifyObj.refresh_token
          }
        };

        popsicle.request(refresherOpts)
          .then(res => {
            // PUT /thirdParties with new tokens
            console.log('haloo', res)
          })
      }
    })
    .catch(err => console.log('errah', err))

}
  //  let genres = []

  //  User.findOne({_id: req.session.user._id})
  //      .then((user) => {
  //        let opts = {
  //          method: 'get',
  //          url: `${process.env.SPOTIFY_URL}/me/top/artists?limit=50&time_range=long_term`,
  //          headers: {
  //            Authorization: `Bearer ${user.spotify.access_token}`
  //          }
  //        }

  //        popsicle(opts)
  //          .then((resp) => {
  //            if (resp.body.items) {
  //              let artistList = resp.body.items.map(artist => {
  //                artist.genres.forEach((each, i) => {
  //                  let currArtist = {},
  //                      genreKey = keyMaker(each),
  //                      genre,
  //                      genreIndex,
  //                      artistIndex

  //                  if (genres.find((ea) => ea.label === genreKey)) {
  //                    genreIndex = genres.findIndex((ea) => ea.label === genreKey)
  //                    genres[genres.findIndex((ea) => ea.label === genreKey)].value++

  //                    if (!genres[genreIndex].artists.find(ea => ea.name === artist.name)) {
  //                      currArtist = {
  //                        name: artist.name,
  //                        image: artist.images[1].url
  //                      }
  //                      genres[genreIndex].artists.push(currArtist)
  //                    }

  //                  } else {
  //                    genre = {
  //                      label: genreKey,
  //                      value: 1,
  //                      artists: []
  //                    }

  //                    genres.push(genre)
  //                  }
  //                })

  //                return {
  //                  name: artist.name,
  //                  genres: artist.genres,
  //                  image: artist.images[1].url
  //                }
  //              })
  //              
  //              genres = genres.sort(sortArr)
  //              user.spotify.top10 = genres.slice(0, 10)
  //              user.spotify.artists = artistList
  //              user.spotify.genres = genres
  //              user.save()
  //              res.json(user)
  //            } else {
  //              let base64Str = new Buffer(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')
  //              let opts = {
  //                method: 'post',
  //                url: 'https://accounts.spotify.com/api/token',
  //                headers: {
  //                  Authorization: `Basic ${base64Str}`,
  //                  'Content-Type': 'application/x-www-form-urlencoded'
  //                },
  //                body: {
  //                  grant_type: 'refresh_token',
  //                  refresh_token: user.spotify.refresh_token
  //                }
  //              }

  //              popsicle(opts)
  //                .then((response) => {
  //                  if (response.body.access_token) {
  //                    user.spotify.access_token = response.body.access_token
  //                    user.save()

  //                    res.json(user)
  //                  } else {
  //                    res.json({error: resp.body.error})
  //                  }
  //                })
  //            }
  //          })
  //      })
  //      .catch((err) => res.json({error: { findUser: err }}))

