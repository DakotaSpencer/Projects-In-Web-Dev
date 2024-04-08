const express = require("express");
const router = express.Router();
const AWS = require("aws-sdk");
//14:20 video
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
      userId: req.query.userId,
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
/**
 * @swagger
 * /user/all:
 *   get:
 *     description: Gets ALL user
 *     responses:
 *       200:
 *         description: success
 */
router.get("/all", async (req, res) => {
  const params = {
    TableName: dynamodbTableName,
  };
  try {
    const allUsers = await scanDynamoRecords(params, []);
    const body = {
      users: allUsers,
    };
    res.json(body);
  } catch (error) {
    console.error("ERROR: ", error);
    res.status(500).send(error);
  }
});
/**
 * @swagger
 * /user:
 *   post:
 *     description: Create a new user
 *     parameters:
 *       - name: userName
 *         description: user's Username
 *         in: formData
 *         required: true
 *         type: string
 *
 *       - name: Name
 *         description: users name
 *         in: formData
 *         required: true
 *         type: string
 *
 *       - name: Bio
 *         description: Fun Information user wants to share
 *         in: formData
 *         required: true
 *         type: string
 *
 *       - name: password
 *         description: Salted + Hashed Password
 *         in: formData
 *         required: true
 *         type: string
 *
 *       - name: profilePicture
 *         description: URL to profile picture
 *         in: formData
 *         required: true
 *         type: string
 *
 *       - name: caughtPokemon
 *         description: All pokemon objects user caught
 *         in: formData
 *         required: true
 *         type: array
 *
 *       - name: featuredPokemon
 *         description: up to 6 Pokemon user wants to share
 *         in: formData
 *         required: true
 *         type: array
 *
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/", async (req, res) => {
  const params = {
    TableName: dynamodbTableName,
    Items: req.body,
  };
  await dynamodb
    .put(params)
    .promise()
    .then(
      () => {
        const body = {
          Operation: "SAVE",
          Message: "SUCCESS",
          Items: req.body,
        };
        res.json(body);
      },
      (error) => {
        console.error("ERROR: ", error);
        res.status(500).send(error);
      }
    );
});
/**
 * @swagger
 * /user:
 *   put:
 *     description: Update a user by ID
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: ID of the user to update
 *         required: true
 *         schema:
 *           type: integer
 *       - name: userName
 *         in: formData
 *         description: User's updated username
 *         required: false
 *         type: string
 *       - name: name
 *         in: formData
 *         description: User's updated name
 *         required: false
 *         type: string
 *       - name: bio
 *         in: formData
 *         description: Updated fun information user wants to share
 *         required: false
 *         type: string
 *       - name: password
 *         in: formData
 *         description: Updated salted + hashed password
 *         required: false
 *         type: string
 *       - name: profilePicture
 *         in: formData
 *         description: Updated URL to profile picture
 *         required: false
 *         type: string
 *       - name: caughtPokemon
 *         in: formData
 *         description: Updated array of all pokemon objects user caught
 *         required: false
 *         type: array
 *         items:
 *           type: object
 *       - name: featuredPokemon
 *         in: formData
 *         description: Updated array of up to 6 Pokemon user wants to share
 *         required: false
 *         type: array
 *         items:
 *           type: object
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Bad request. Please check your input.
 *       404:
 *         description: User not found
 */
router.patch("/", async (req, res) => {
  const params = {
    TableName: dynamodbTableName,
    Key: {
      userId: req.query.userId,
    },
    UpdateExpression: `set ${req.body.updateKey} = :value`,
    ExpresstionAttributeValues: {
      ":value": req.body.updateValue,
    },
    ReturnValues: "UPATED_NEW",
  };
  await dynamodb
    .update(params)
    .promise()
    .then((response) => {
      () => {
        const body = {
          Operation: "UPDATE",
          Message: "SUCCESS",
          UpdatedAttributes: response,
        };
        res.json(body);
      },
        (error) => {
          console.error("ERROR: ", error);
          res.status(500).send(error);
        };
    });
});
router.delete("/", async (req, res) => {
  const params = {
    TableName: dynamodbTableName,
    Key: {
      userId: req.query.userId,
    },
    ReturnValues: "ALL_OLD",
  };
  await dynamodb
    .update(params)
    .promise()
    .then((response) => {
      () => {
        const body = {
          Operation: "DELETE",
          Message: "SUCCESS",
          Items: response,
        };
        res.json(body);
      },
        (error) => {
          console.error("ERROR: ", error);
          res.status(500).send(error);
        };
    });
});

const scanDynamoRecords = async (scanParams, itemsArray) => {
  try {
    const dynamoData = await dynamodb.scan(scanParams).promise();
    itemsArray = itemsArray.concat(dynamoData.Items);
    if (dynamoData.LastEvaluatedKey) {
      scanParams.ExclusiveStartKey;
      //Loop again if there is more data
      return await scanDynamoRecords(scanParams, itemsArray);
    }
    return itemsArray;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = router;
