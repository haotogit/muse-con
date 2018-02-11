module.exports = (() => {
  const config = {
    app: {
      url: {
        protocol: process.env.SERVER_PROTOCOL || 'http',
        hostname: process.env.SERVER_HOSTNAME || 'localhost',
        port: process.env.SERVER_PORT || 8080
      },
      env: process.env.NODE_ENV || 'dev',
      logLevel: process.env.LOG_LEVEL || 'debug',
      api: {
        protocol: process.env.API_PROTOCOL || 'http',
        hostname: process.env.API_HOSTNAME || 'localhost',
        port: process.env.API_PORT || 8087,
        pathname: '/api/v1'
      }
    },
    external: {
      spotify: {
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        baseUrl: 'https://api.spotify.com/v1'
      },
      ticketmaster: {
        baseUrl: process.env.TICKETMASTER_URL,
        apiKey: process.env.TICKETMASTER_KEY
      }
    }
  };

  return config;
})();
