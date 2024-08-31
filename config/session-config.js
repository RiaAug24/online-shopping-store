const expressSession = require("express-session");
const mongoDbStore = require("connect-mongodb-session");

let createSessionStore = () => {
  const mongoDBSTore = mongoDbStore(expressSession);
  const store = new mongoDBSTore({
    uri: "mongodb://127.0.0.1:27017",
    databaseName: "acadestore_db",
    collection: "sessions",
  });

  return store;
};

function createSessionConfig() {
  return {
    secret: "course-finale-project",
    resave: false,
    saveUninitialized: false,
    store: createSessionStore(),
    cookie: {
      maxAge: 2 * 24 * 60 * 60 * 1000,
    },
  };
}

module.exports = createSessionConfig;
