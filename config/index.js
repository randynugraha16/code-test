export const config = {
  HASH_KEY: process.env.HASH_KEY || "code-id",
  IP_MONGO: process.env.IP_MONGO || "127.0.0.1:27017",
  DB_MONGO: process.env.DB_MONGO || "randy",
  ENV: process.env.ENV || "DEVELOPMENT",
};
