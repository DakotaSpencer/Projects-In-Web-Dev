const express = require("express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
//Swagger setup go... https://www.youtube.com/watch?v=eiSem0cqaN0
//AWS setup go...https://www.youtube.com/watch?v=YJvXHr69AHg

const userRouter = require("./routes/user");

const app = express();
app.use(express.json());
app.use("/user", userRouter);

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "PRO460-API",
      version: "1.0.0",
      description:
        "An API that will call AWS DynamoDB to get and store user data on a Pokémon website",
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
app.get("/userTest", (req, res) => {
  res.send([
    {
      id: 1,
      userName: "Bla Test",
      name: "Mr. Bla",
      bio: "bla is defamation and pokemon is fun!",
      password: "asdjfjfasdoiupfoicxifupoaidmfe98dk3mdo2jmcusyqj", //THIS IS FAKE
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
