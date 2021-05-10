var express = require("express");
var router = express.Router();

/**
 * @openapi
 * /:
 *   get:
 *     summary: Returns a JSON with verify true.
 *     description: Verify that the API is running
 *     responses:
 *       200:
 *         description: Returns a JSON with verify true.
 */
/* GET home page. */
router.get("/", function (req, res, next) {
  res.status(200).json({ verify: "true" });
});



module.exports = router;
