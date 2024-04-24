// userSchema.js
const User = {
  type: "object",
  properties: {
    userId: {
      type: "string",
    },
    userName: {
      type: "string",
    },
    email: {
      type: "string",
    },
    name: {
      type: "string",
    },
    bio: {
      type: "string",
    },
    password: {
      type: "string",
    },
    profilePicture: {
      type: "string",
    },
    caughtPokemon: {
      type: "array",
      items: {
        type: "object",
      },
    },
    featuredPokemon: {
      type: "array",
      items: {
        type: "object",
      },
    },
  },
};

const NewUser = {
  type: "object",
  properties: {
    userName: {
      type: "string",
    },
    email: {
      type: "string",
    },
    name: {
      type: "string",
    },
    bio: {
      type: "string",
    },
    password: {
      type: "string",
    },
    profilePicture: {
      type: "string",
    },
    caughtPokemon: {
      type: "array",
      items: {
        type: "object",
      },
    },
    featuredPokemon: {
      type: "array",
      items: {
        type: "object",
      },
    },
  },
};

const UpdateUser = {
  type: "object",
  properties: {
    userName: {
      type: "string",
    },
    email: {
      type: "string",
    },
    name: {
      type: "string",
    },
    bio: {
      type: "string",
    },
    password: {
      type: "string",
    },
    profilePicture: {
      type: "string",
    },
    caughtPokemon: {
      type: "array",
      items: {
        type: "object",
      },
    },
    featuredPokemon: {
      type: "array",
      items: {
        type: "object",
      },
    },
  },
};

module.exports = { User, NewUser, UpdateUser };
