const env = process.env;

const config = {
  db: {
    host: env.DB_HOST || '0.0.0.0',
    port: env.DB_PORT || '5432',
    user: env.DB_USER || 'username',
    password: env.DB_PASSWORD || 'pgpassword',
    database: env.DB_NAME || 'mydatabase',
  },
};

module.exports = config;