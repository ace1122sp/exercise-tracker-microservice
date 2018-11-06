module.exports = {
  app: {
    port: process.env.PORT
  },
  db: {
    mongoURI: `mongodb://${process.env.USERNAME}:${process.env.PASS}@${process.env.HOST}:${process.env.PORT}/${process.env.DB_NAME}`
  }
};