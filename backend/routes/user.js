const express = require("express");
const router = express.Router();
const DynamoDAL = require("../DynamoDAL");
const DAL = new DynamoDAL();

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
router.get("/email/get", async (req, res) => {
  const email = req.body.email;
  const response = await DAL.getTables();
  const user = await DAL.getByEmail(await response.tables[0], email);
  console.log(user)
  res.send(await user);
});
router.get("/username/get", async (req, res) => {
  const username = req.body.username;
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

module.exports = router;
