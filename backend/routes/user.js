const express = require("express");
const router = express.Router();
const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
});

/**
 * @swagger
 * /user:
 *   get:
 *     description: Gets user
 *     responses:
 *       200:
 *         description: success
 */
router.get("/", async (req, res) => {
  const params = {
    TableName: dynamodbTableName,
    Key: {
      productId: req.query.productId,
    },
  };
  await dynamoDb
    .get(params)
    .promise()
    .then(
      (response) => {
        res.json();
      },
      (error) => {
        console.error("ERROR: ", error);
        res.status(500).send(error);
      }
    );
});
//TIMELINE 9:18
router.get("/all", (req, res) => {});
router.post("/", (req, res) => {});
router.patch("/", (req, res) => {});
router.delete("/", (req, res) => {});

module.exports = router;
