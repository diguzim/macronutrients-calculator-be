export default () => ({
  env: process.env.APP_ENV,
  port: parseInt(process.env.PORT),
  database: {
    url: process.env.DATABASE_URL,
    mongoUrl: process.env.MONGO_URL,
  },
});
