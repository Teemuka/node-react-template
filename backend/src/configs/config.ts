export const config = {
  TOKEN_SECRET: process.env.TOKEN_SECRET!,
  TOKEN_EXPIRATION: "10s",
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET!,
  REFRESH_TOKEN_EXPIRATION: "20s",
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV,
  AUTH: process.env.AUTH || "true",
  MONGOUSER: process.env.MONGOUSER,
  MONGOPASSWORD: process.env.MONGOPASSWORD,
  MONGOHOST: process.env.MONGOHOST,
  MONGOPORT: process.env.MONGOPORT,
  MONGODATABASE: process.env.MONGODATABASE,
};

export const MONGO_URI = `mongodb://${config.MONGOUSER}:${config.MONGOPASSWORD}@${config.MONGOHOST}:${config.MONGOPORT}/${config.MONGODATABASE}?authSource=admin`;
