require("dotenv").config();
const express = require("express");
const chalk = require("chalk");

const cluster = require("cluster");
const os = require("os");
const { Server } = require("socket.io");
const ResponseHandler = require("./Http/ResponseHandler");
require("./Core/Config").connectMongo();

const cors = require("cors");
const app = express();

const server = require("http").createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://192.168.1.18:8801", "http://localhost:8801", "http://192.168.1.18:6001", "http://localhost:3000/"],
    methods: ["GET", "POST"],
  },
});

const port = process.env.PORT || 3000;

app.use(cors());

// response handling by creating response handler class
const responseHandler = async (req, res, next) => {
  res.handler = await new ResponseHandler(req, res);
  next();
};
app.use(responseHandler);

// common middlwares
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));

app.use(express.static(__dirname + "/public"));

// app routing configuration
try {
  const appRouter = require("./Http/routes");
  appRouter(app);
} catch (error) {
  console.log(chalk.bgRed("Routing Error: ", error));
}

// app socket configuration
try {
  const appSocket = require("./Core/Config").connectSocket;
  appSocket(io);
} catch (error) {
  console.log(chalk.bgRed("Socket Error: ", error));
}

let noOfCpus = os.cpus().length;

if (cluster.isPrimary) {
  if (process.env.DEVELOPMENT === "true") noOfCpus = 1;

  for (let i = 0; i < noOfCpus; i++) {
    cluster.fork();
  }

  cluster.on("online", (worker) => {
    console.log(chalk.bgWhite(`Worker working on ${worker.process.pid} `));
  });

  cluster.on("exit", (worker) => {
    console.log(chalk.bgRed(`Worker process ${worker.process.pid} died. Restarting...`));
  });
} else {
  server.listen(port, () => {
    console.log(chalk.bgGreen(`server running on port number ${port}`));
  });
}
