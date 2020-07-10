const express = require("express");
const { postMetrics, sumMetrics } = require("./metrics");
const router = express.Router();

router.post("/metrics/:key", postMetrics);
router.post("/metrics/:key/sum", sumMetrics);

module.exports = router;
