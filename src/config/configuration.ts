export const config = Object.freeze({
  port: process.env.PORT as string,
  database_url: process.env.MONGODB_URL as string,
  jwt_secret_key: process.env.JWT_SECRET_KEY as string,
  origin: process.env.ORIGIN as string,
});
