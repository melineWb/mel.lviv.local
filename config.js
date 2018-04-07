let config = {
  development: {
    url: 'http://localhost:8082',
    database: {
      host: 'localhost',
      port: '27017',
      db: 'melineblog'
    },
    //server details
    server: {
      host: '127.0.0.1',
      port: '8082'
    }
  },
  production: {}
};
module.exports = config;
