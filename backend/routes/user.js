const express = require("express");
const router = express.Router();
const DynamoDAL = require("../DynamoDAL");
const Utils = require("../util");
const { profileEnums } = require("../enums/profileEnums");
const DAL = new DynamoDAL();
const util = new Utils();

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     description: Get a user by ID
 *     tags: [User]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the user
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '$/components/schemas/User'
 *       404:
 *         description: User not found
 */
router.get("/:id", async (req, res) => {
  const userId = req.params.id;
  const response = await DAL.getTables();
  const user = await DAL.getById(await response.tables[0], userId);
  res.send(await user);
});
router.get("/email/get/:email", async (req, res) => {
  const email = req.params.email;
  const response = await DAL.getTables();
  const user = await DAL.getByEmail(await response.tables[0], email);
  console.log(user)
  res.send(await user);
});
router.get("/username/get/:username", async (req, res) => {
  const username = req.params.username;
  const response = await DAL.getTables();
  const user = await DAL.getByUsername(await response.tables[0], username);
  res.send(await user);
});
/**
 * @swagger
 * /user:
 *   get:
 *     description: Get all users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/", async (req, res) => {
  const response = await DAL.getTables();
  const users = await DAL.get(response.tables[0]);
  console.log(await users);
  res.send(await users.Items);
});
/**
 * @swagger
 * /user:
 *   post:
 *     description: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               userName:
 *                 type: string
 *               name:
 *                 type: string
 *               bio:
 *                 type: string
 *               password:
 *                 type: string
 *               profilePicture:
 *                 type: string
 *               caughtPokemon:
 *                 type: array
 *                 items:
 *                   type: string
 *               featuredPokemon:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request. Please check your input.
 */
router.post("/", async (req, res) => {
  // console.log("The request body: ", req.body);
  try {
    const response = await DAL.getTables();
    const create = await DAL.createUser(response.tables[0], req.body);
    return res.json({ Message: "SUCCESS", Response: create });
  } catch (e) {
    return res.json({ Message: "ERROR: " + e });
  }
});
/**
 * @swagger
 * /user/{id}:
 *   put:
 *     description: Update a user by ID
 *     tags: [User]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the user
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUser'
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Bad request. Please check your input.
 *       404:
 *         description: User not found
 */
router.patch("/", async (req, res) => {
  // const params = {
  //   TableName: dynamodbTableName,
  //   Key: {
  //     userId: req.query.userId,
  //   },
  //   UpdateExpression: `set ${req.body.updateKey} = :value`,
  //   ExpresstionAttributeValues: {
  //     ":value": req.body.updateValue,
  //   },
  //   ReturnValues: "UPATED_NEW",
  // };
  // await dynamodb
  //   .update(params)
  //   .promise()
  //   .then((response) => {
  //     () => {
  //       const body = {
  //         Operation: "UPDATE",
  //         Message: "SUCCESS",
  //         UpdatedAttributes: response,
  //       };
  //       res.json(body);
  //     },
  //       (error) => {
  //         console.error("ERROR: ", error);
  //         res.status(500).send(error);
  //       };
  //   });
});
router.put("/email/put", async (req, res) => {
  try {
    const response = await DAL.getTables();
    if (req.body.email && req.body.userId) {
      const create = await DAL.putUser(
        response.tables[0],
        req.body.userId,
        profileEnums.email,
        req.body.email
      );
      return res.json({ Message: "SUCCESS", Response: create });
    } else {
      return res.json({
        Message: "Need to have an email or userId value in request body",
      });
    }
  } catch (e) {
    return res.json({ Message: "ERROR: " + e });
  }
});
router.put("/username/put", async (req, res) => {
  try {
    const response = await DAL.getTables();
    if (req.body.username && req.body.userId) {
      const create = await DAL.putUser(
        response.tables[0],
        req.body.userId,
        profileEnums.username,
        req.body.username
      );
      return res.json({ Message: "SUCCESS", Response: create });
    } else {
      return res.json({
        Message: "Need to have an username or userId value in request body",
      });
    }
  } catch (e) {
    return res.json({ Message: "ERROR: " + e });
  }
});
router.put("/password/put", async (req, res) => {
  try {
    const response = await DAL.getTables();
    if (req.body.password && req.body.userId) {
      const secretPassword = await util.hashPassword(
        util.saltPassword(req.body.password)
      );

      const create = await DAL.putUser(
        response.tables[0],
        req.body.userId,
        profileEnums.password,
        secretPassword
      );
      return res.json({ Message: "SUCCESS", Response: create });
    } else {
      return res.json({
        Message: "Need to have a password or userId value in request body",
      });
    }
  } catch (e) {
    return res.json({ Message: "ERROR: " + e });
  }
});
router.put("/profilePicture/put", async (req, res) => {
  try {
    const response = await DAL.getTables();
    if (req.body.profilePicture && req.body.userId) {
      const create = await DAL.putUser(
        response.tables[0],
        req.body.userId,
        profileEnums.profilePicture,
        req.body.profilePicture
      );
      return res.json({ Message: "SUCCESS", Response: create });
    } else {
      return res.json({
        Message:
          "Need to have a profilePicture or userId value in request body",
      });
    }
  } catch (e) {
    return res.json({ Message: "ERROR: " + e });
  }
});
router.put("/bio/put", async (req, res) => {
  try {
    const response = await DAL.getTables();
    if (req.body.bio && req.body.userId) {
      const create = await DAL.putUser(
        response.tables[0],
        req.body.userId,
        profileEnums.bio,
        req.body.bio
      );
      return res.json({ Message: "SUCCESS", Response: create });
    } else {
      return res.json({
        Message: "Need to have a bio or userId value in request body",
      });
    }
  } catch (e) {
    return res.json({ Message: "ERROR: " + e });
  }
});
router.put("/name/put", async (req, res) => {
  try {
    const response = await DAL.getTables();
    if (req.body.name && req.body.userId) {
      const create = await DAL.putUser(
        response.tables[0],
        req.body.userId,
        profileEnums.name,
        req.body.name
      );
      return res.json({ Message: "SUCCESS", Response: create });
    } else {
      return res.json({
        Message: "Need to have a name or userId value in request body",
      });
    }
  } catch (e) {
    return res.json({ Message: "ERROR: " + e });
  }
});
/**
 * @swagger
 * /user/remove/{id}:
 *   delete:
 *     description: Delete a user by ID
 *     tags: [User]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the user
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete("/remove/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const response = await DAL.getTables();
    const delResponse = await DAL.deleteUser(response.tables[0], userId);
    res.json({
      Message: `OBJECT ${userId} DELETED SUCCESSFULLY`,
      API: delResponse,
    });
  } catch (e) {
    res.json({ Message: e });
  }
});

router.get("/validate/password", async (req, res) => {
  const inputPassword = req.body.inputPassword;
  const hashedPassword = req.body.hashedPassword;

  console.log(inputPassword, hashedPassword);
  if (inputPassword && hashedPassword) {
    const message = await util.comparePasswords(
      util.saltPassword(inputPassword),
      hashedPassword
    );
    res.send({
      status: 200,
      Message: message,
    });
  } else {
    res.send({
      stats: 403,
      Message: "Please send over the inputPassword and the hashedPassword",
    });
  }
});

module.exports = router;
