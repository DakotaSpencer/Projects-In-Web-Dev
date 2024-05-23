const express = require("express");
const router = express.Router();
const multer = require("multer");
const DynamoDAL = require("../DynamoDAL");
const Utils = require("../util");
const { profileEnums } = require("../enums/profileEnums");
const DAL = new DynamoDAL();
const util = new Utils();
const upload = multer();

//CREATE
router.post("/", async (req, res) => {
  // console.log("The request body: ", req.body);
  try {
    const response = await DAL.getTables();
    const create = await DAL.createUser(response.tables[0], req.body);
    console.log(create);
    return res.json({
      Message: "SUCCESS",
      Response: create.response,
      key: create.key,
    });
  } catch (e) {
    return res.json({ Message: "ERROR: " + e });
  }
});
router.post("/validate/password", upload.none(), async (req, res) => {
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
      status: 400,
      Message: `Please include ${
        inputPassword ? "" : "the inputPassword and"
      } ${hashedPassword ? "" : "the hashedPassword"}`,
    });
  }
});

//READ
router.get("/:id", async (req, res) => {
  const userId = req.params.id;
  const response = await DAL.getTables();
  const user = await DAL.getById(await response.tables[0], userId);
  res.send({ status: "200", user: await user });
});
router.get("/email/get/:email", async (req, res) => {
  const email = req.params.email;
  const response = await DAL.getTables();
  const user = await DAL.getByEmail(await response.tables[0], email);
  res.send(await user);
});
router.get("/username/get/:username", async (req, res) => {
  const username = req.params.username;
  const response = await DAL.getTables();
  const user = await DAL.getByUsername(await response.tables[0], username);
  res.send(await user);
});
router.get("/", async (req, res) => {
  const response = await DAL.getTables();
  const users = await DAL.get(response.tables[0]);
  res.send(await users.Items);
});

//UPDATE
// router.patch("/", async (req, res) => {
//   // const params = {
//   //   TableName: dynamodbTableName,
//   //   Key: {
//   //     userId: req.query.userId,
//   //   },
//   //   UpdateExpression: `set ${req.body.updateKey} = :value`,
//   //   ExpresstionAttributeValues: {
//   //     ":value": req.body.updateValue,
//   //   },
//   //   ReturnValues: "UPATED_NEW",
//   // };
//   // await dynamodb
//   //   .update(params)
//   //   .promise()
//   //   .then((response) => {
//   //     () => {
//   //       const body = {
//   //         Operation: "UPDATE",
//   //         Message: "SUCCESS",
//   //         UpdatedAttributes: response,
//   //       };
//   //       res.json(body);
//   //     },
//   //       (error) => {
//   //         console.error("ERROR: ", error);
//   //         res.status(500).send(error);
//   //       };
//   //   });
// });
router.put("/email/put", async (req, res) => {
  try {
    const response = await DAL.getTables();
    if (req.body.email && req.body.userId) {
      fetch(`http://localhost:5000/user/${req.body.userId}`, { method: "GET" })
        .then((resp) => resp.json())
        .then(async (data) => {
          if (
            data.status === "200" &&
            data.user.Item.userId.S === req.body.userId
          ) {
            const create = await DAL.putUser(
              response.tables[0],
              req.body.userId,
              profileEnums.email,
              req.body.email
            );
            return res.json({ Message: "SUCCESS", Response: create });
          } else {
            return res.json({
              Message: "Invalid userId",
            });
          }
        })
        .catch((e) => {
          return res.json({ Messgae: "Error with getUserId fetch", Error: e });
        });
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
      fetch(`http://localhost:5000/user/${req.body.userId}`, { method: "GET" })
        .then((resp) => resp.json())
        .then(async (data) => {
          if (
            data.status === "200" &&
            data.user.Item.userId.S === req.body.userId
          ) {
            const create = await DAL.putUser(
              response.tables[0],
              req.body.userId,
              profileEnums.username,
              req.body.username
            );
            return res.json({ Message: "SUCCESS", Response: create });
          } else {
            return res.json({
              Message: "Invalid userId",
            });
          }
        })
        .catch((e) => {
          return res.json({ Messgae: "Error with getUserId fetch", Error: e });
        });
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
//DELETE
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
