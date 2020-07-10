const { redisClient } = require("../config/redis");

// "/metrics/{key}" endpoint
const postMetrics = async (req, res) => {
  const { key } = req.params;
  const { value } = req.body;

  const data = {
    value,
    timestamp: Date.now(),
  };

  // adding posted data to redis
  redisClient.sadd(key, JSON.stringify(data));

  res.status(200).send();
};

// "/metrics/{key}/sum" endpoint
const sumMetrics = async (req, res) => {
  const { key } = req.params;

  // retrieving previously posted data from redis
  redisClient.smembers(key, (err, values) => {
    let sum = 0;
    values.forEach((one) => {
      console.log(key, ":", one);

      // calculating the difference in time from now with the data posted previously
      let TimeDifference = Math.round(
        Math.abs(Date.now() - Number(JSON.parse(one).timestamp)) / 36e5,
      );

      if (TimeDifference < 1) {
        // summing only the data that was posted less than an hour ago
        sum += Number(JSON.parse(one).value);
      } else {
        // removing data that was posted over an hour ago
        redisClient.srem(key, one);
      }
    });

    if (sum === 0) {
      // normally there would be an error message, but changing the sum variable directly for facilitation
      sum = "Sorrt, No values for this Key";
    }
    res.status(200).json({ sum });
  });
};

module.exports = { postMetrics, sumMetrics };
