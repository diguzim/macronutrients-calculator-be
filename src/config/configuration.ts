export default () => ({
  env: process.env.APP_ENV,
  port: parseInt(process.env.PORT),
});
