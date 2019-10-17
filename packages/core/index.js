import express from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import responseTime from "response-time";
import winston from "winston";
import logger from "./lib/logger";
import settings from "./lib/settings";
import security from "./lib/security";
import { db } from "./lib/mongo";
import dashboardWebSocket from "./lib/dashboardWebSocket";
import ajaxRouter from "./ajaxRouter";
import apiRouter from "./apiRouter";
const app = express();
app.all("*", (req, res, next) => {
  // CORS headers

  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,UPDATE,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override,authorization, Content-Type, Accept"
  );
  next();
});
app.use(cookieParser("secret"));
security.applyMiddleware(app);
app.set("trust proxy", 1);
app.use(helmet());
app.use(responseTime());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(settings.filesUploadPath));
app.use("/ajax", ajaxRouter);
app.use("/api", apiRouter);
app.use(logger.sendResponse);

const server = app.listen(settings.apiListenPort, () => {
  const serverAddress = server.address();
  winston.info(`API running at http://localhost:${serverAddress.port}`);
});

dashboardWebSocket.listen(server);
