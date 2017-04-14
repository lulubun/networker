exports.DATABASE_URL = 'mongodb://networker:networkerpassword@ds155080.mlab.com:55080/networkerdb' ||
  process.env.DATABASE_URL ||
  global.DATABASE_URL ||
  'mongodb://localhost/networker';

exports.PORT = process.env.PORT || 8080;
