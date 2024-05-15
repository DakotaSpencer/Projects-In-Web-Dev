require("dotenv").config();
const { UserByEmailGSI } = require("./Schemas/User");
const Utils = require("./util");
const util = new Utils();
const {
  DynamoDBClient,
  ListTablesCommand,
  GetItemCommand,
  ScanCommand,
  PutItemCommand,
  DeleteItemCommand,
  UpdateItemCommand,
} = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
class DynamoDAL {
  async getTables() {
    try {
      const listTables = new ListTablesCommand();
      const response = await client.send(listTables);
      //   await console.log(response);
      //   await console.log("TABLES: ", { tables: response.TableNames });
      return await { tables: response.TableNames };
    } catch (e) {
      console.log("ERROR with connecting to AWS tables. ERROR: ", e);
    }
  }
  //CREATE
  async createUser(tableName, newUser) {
    // Prepare the new User to be stored to the database
    // console.log("NEW USER TO CALL DATABASE: ", newUser);
    try {
      const objectKey = util.generateKey();
      const params = {
        TableName: tableName,
        Item: {
          userId: { S: objectKey },
          userName: { S: newUser.userName },
          email: { S: newUser.email },
          name: { S: newUser.name },
          bio: { S: newUser.bio },
          password: {
            S: await util.hashPassword(util.saltPassword(newUser.password)),
          },
          profilePicture: { S: newUser.profilePicture },
          caughtPokemon: { SS: ["0"] },
          featuredPokemon: { SS: ["0"] },
        },
      };
      // Put the item into DynamoDB
      const command = new PutItemCommand(params);
      const response = await client.send(command);
      return { response: response, key: objectKey };
    } catch (e) {
      console.log("ERROR WITH CREATE: ", e);
    }
  }
  //READ
  async getById(tableName, id) {
    try {
      const getItemCommand = new GetItemCommand({
        TableName: tableName,
        Key: { userId: { S: id } },
      });
      const response = await client.send(getItemCommand);
      return await { Item: response.Item };
    } catch (e) {
      console.log("ERROR: ", e);
    }
  }
  async getByUsername(tableName, username) {
    try {
      const scanCommand = new ScanCommand({
        TableName: tableName,
        FilterExpression: "#userName = :userNameValue",
        ExpressionAttributeNames: {
          "#userName": "userName",
        },
        ExpressionAttributeValues: {
          ":userNameValue": { S: username },
        },
      });

      const response = await client.send(scanCommand);

      if (response.Items.length > 0) {
        return { Item: response.Items[0] };
      } else {
        return null;
      }
    } catch (e) {
      console.error("ERROR: ", e);
      throw e;
    }
  }
  async getByEmail(tableName, email) {
    try {
      const scanCommand = new ScanCommand({
        TableName: tableName,
        FilterExpression: "#email = :emailValue",
        ExpressionAttributeNames: {
          "#email": "email",
        },
        ExpressionAttributeValues: {
          ":emailValue": { S: email },
        },
      });

      const response = await client.send(scanCommand);

      if (response.Items.length > 0) {
        return { Item: response.Items[0] };
      } else {
        return null;
      }
    } catch (e) {
      console.error("ERROR: ", e);
      throw e;
    }
  }
  async get(tableName) {
    try {
      const scan = new ScanCommand({ TableName: tableName });
      const response = await client.send(scan);
      console.log("Scan response:", response);
      return response;
    } catch (e) {
      console.log("ERROR: ", e);
    }
  }
  //UPDATE
  //PUT
  async putUser(tableName, id, key, value) {
    try {
      const updateCommand = new UpdateItemCommand({
        TableName: tableName,
        Key: {
          userId: { S: id },
        },
        UpdateExpression: `SET #attr = :val`,
        ExpressionAttributeNames: {
          "#attr": key,
        },
        ExpressionAttributeValues: {
          ":val": { S: value },
        },
        ReturnValues: "ALL_NEW",
      });

      const response = await client.send(updateCommand);

      console.log(`UserId <${id}> ${key} updated successfully.`);
      return response.Attributes;
    } catch (error) {
      console.error("ERROR: ", error);
      throw error;
    }
  }
  //DELETE
  async deleteUser(tableName, id) {
    try {
      const params = {
        TableName: tableName,
        Key: {
          userId: { S: id },
        },
      };
      const command = new DeleteItemCommand(params);
      const response = await client.send(command);
      return response;
    } catch (e) {
      console.log("ERROR WITH DELETE: ", e);
    }
  }
}

module.exports = DynamoDAL;
