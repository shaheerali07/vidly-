const mongoose = require("mongoose");
const debug = require("debug")("app:startup");
const config = require("config");
const morgan = require("morgan");
const logger = require("./middleware/logger");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");
const home = require("./routes/home");
const express = require("express");
const app = express();

//for deployment
require("./startup/prod")(app);

//To check jwtPrivateKey
if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}

//mongodb connection
mongoose
  .connect("mongodb://localhost/vidly", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Could not connect to MongoDB"));
//Setting up template engine
app.set("view engine", "pug");
app.set("views", "./views"); //default root for the application to access templates
//build-in middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(morgan("tiny"));
debug("Morgan enabled.");
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/", home);
//configration
console.log("Application Name: " + config.get("name"));
console.log("Mail Server Name: " + config.get("mail.host"));
//An example of custom middleware function
app.use(logger);
//configuring port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
