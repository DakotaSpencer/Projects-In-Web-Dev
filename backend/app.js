const express = require("express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const { User, NewUser, UpdateUser } = require("./Schemas/User");
const cors = require("cors");

//Swagger setup go... https://www.youtube.com/watch?v=eiSem0cqaN0
//AWS setup go...https://www.youtube.com/watch?v=YJvXHr69AHg

const userRouter = require("./routes/user");
const Utils = require("./util");
const util = new Utils();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/user", userRouter);

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "PRO460-API",
      version: "1.0.0",
      description:
        "An API that will call AWS DynamoDB to get and store user data on a Pokémon website",
    },
    components: {
      schemas: {
        User,
        NewUser,
        UpdateUser,
      },
    },
  },
  apis: ["app.js", "./routes/user.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// Your API routes here
/**
 * @swagger
 * /userTest:
 *   get:
 *     description: Test express and swagger users page
 *     responses:
 *       200:
 *         description: success
 */
app.get("/userTest", async (req, res) => {
  const password = await util.hashPassword(util.saltPassword("TestTest1"));
  res.send([
    {
      id: util.generateKey(),
      userName: "Bla Test",
      name: "Mr. Bla",
      bio: "bla is defamation and pokemon is fun!",
      password: password,
      profilePicture:
        "https://cdn.7tv.app/emote/651c53a939bda127a3225b1f/4x.webp",
      caughtPokemon: [],
      featuredPokemon: [],
    },
  ]);
});

app.listen(5000, () => {
  console.log("App listening on port 5000");
});
