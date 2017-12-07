module.exports = (() => {
  const config = {
    app: {
      port: process.env.PORT || 8080,
      env: process.env.NODE_ENV || 'dev',
      logLevel: process.env.LOG_LEVEL || 'debug',
      api: {
        protocol: process.env.API_PROTOCOL || 'http',
        hostname: process.env.API_HOST || 'localhost',
        port: process.env.API_PORT || 8087,
        pathname: '/api/v1'
      }
    },
    external: {
      spotify: {
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        baseUrl: 'https://api.spotify.com/v1'
      }
    }
  };

  return config;
})();
