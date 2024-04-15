require("dotenv").config();
const {
  DynamoDBClient,
  ListTablesCommand,
  GetItemCommand,
  ScanCommand,
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
  async getById(tableName, id) {
    try {
      console.log("Table name passed through:", tableName);
      const getItemCommand = new GetItemCommand({
        TableName: tableName,
        Key: { userId: { S: id } },
      });
      const response = await client.send(getItemCommand);
      await console.log(response);
      return await { Item: response.Item };
    } catch (e) {
      console.log("ERROR: ", e);
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
}

module.exports = DynamoDAL;
