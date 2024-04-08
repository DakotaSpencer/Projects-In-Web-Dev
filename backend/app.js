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

//POSTS
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

app.listen(5000, () => {
  console.log("App listening on port 5000");
});
