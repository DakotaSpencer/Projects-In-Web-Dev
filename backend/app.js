const express = require("express");
const swaggerUI = require("swagger-ui-express");
const cors = require("cors");
const bodyParser = require("body-parser");
const yaml = require("yamljs");
const multer = require("multer");

//Swagger setup go... https://www.youtube.com/watch?v=eiSem0cqaN0
//AWS setup go...https://www.youtube.com/watch?v=YJvXHr69AHg

const userRouter = require("./routes/user");
const Utils = require("./util");
const util = new Utils();

const upload = multer();
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/user", userRouter);

// const swaggerOptions = {
//   swaggerDefinition: {
//     info: {
//       title: "PRO460-API",
//       version: "1.0.0",
//       description:
//         "An API that will call AWS DynamoDB to get and store user data on a Pokémon website",
//     },
//     // components: {
//     //   schemas: {
//     //     User,
//     //     NewUser,
//     //     UpdateUser,
//     //   },
//     // },
//   },
//   apis: ["app.js", "./routes/user.js"],
// };

const swaggerDocument = yaml.load("./users.yaml");
console.log(swaggerDocument);
// const swaggerDocs = swaggerJsDoc({
//   ...swaggerOptions,
//   definition: swaggerDocument,
// });

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

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
