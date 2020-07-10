const keys = require("../keys");

// Redis Client Setup
const redis = require("redis");
const redisClient = redis.createClient(
  keys.redisURL || {
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000,
  },
);
// redisClient.FLUSHALL();
module.exports = { redisClient };
