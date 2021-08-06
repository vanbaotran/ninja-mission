require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");
const http = require("http");

const app = express();
const corsOptions = {
  credentials: true,
  origin: ["http://localhost:3000"],
};
app.use(cors(corsOptions));

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });

const app_name = require("./package.json").name;
const debug = require("debug")(`${app_name}:${path.basename(__filename).split(".")[0]}`);

// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(
  require("node-sass-middleware")({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    sourceMap: true,
  })
);

app.set("views", path.join(__dirname, "views"));

// ADD SESSION SETTINGS HERE:
app.use(
  session({
    secret: "some secret goes here",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3600000 * 24 * 7 * 2 },
    // cookie: { Lax: true },
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    }),
  })
);
const server = http.createServer(app);
const io = require("socket.io")(server, { cors: corsOptions });

io.on("connection", function (socket) {
  console.log(socket.id);

  socket.on("join-room", (room) => {
    console.log(room);
    socket.join(room);
    socket.on("sendMessage", (mess) => {
      io.to(room).emit("receiveMessageFromOther", mess);
    });
  });
});

// default value for title local
app.locals.title = "Express - Generated with IronGenerator";
app.use("/upload", require("./routes/upload-routes.js"));
const userRouter = require("./routes/user-routes");
app.use("/users", userRouter);
const postRouter = require("./routes/post-routes");
app.use("/posts", postRouter);
const applicationRouter = require("./routes/application-routes");
app.use("/applications", applicationRouter);
const roomRouter = require("./routes/room-routes");
app.use("/rooms", roomRouter);
// app.put("/chatbox/:id", (req, res, next) => {
//   const roomId = req.params.id;

//   const newRoom = { status: 4 };

//   req.io.to(roomId).emit("order:update", message);

//   res.json(message);
// });

// Serve static files from client/build folder
app.use(express.static("client/build"));
// For any other routes: serve client/build/index.html SPA
app.use((req, res, next) => {
  res.sendFile(`${__dirname}/client/build/index.html`, (err) => {
    if (err) next(err);
  });
});

app.use((err, req, res, next) => {
  // always log the error
  console.error("ERROR", req.method, req.path, err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(500);
    res.json({ message: "Error please contact administrateur" });
  }
});
const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Listening on http://localhost:${process.env.PORT}`);
});
app.use((req, res, next) => {
  // If no routes match, send them the React HTML.
  res.sendFile(__dirname + "/public/index.html");
});
module.exports = app;
