export const config = Object.freeze({
  port: process.env.PORT,
  database_url: process.env.MONGODB_URL,
  jwt_secret_key: process.env.JWT_SECRET_KEY,
  origin: process.env.ORIGIN,
});
