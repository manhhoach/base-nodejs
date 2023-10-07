const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

const { responseWithError } = require("./helpers/response");
const routers = require("./routers");
const { logEvent } = require("./helpers/logEvent");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routers);
app.use((err, req, res, next) => {
  logEvent(
    `URL: ${req.url}, METHOD: ${req.method}, BODY: ${JSON.stringify(
      req.body
    )}, PARAMS: ${JSON.stringify(req.params)}, QUERY: ${JSON.stringify(
      req.query
    )} -> ERROR: ${err.message}`
  );
  res.status(err.statusCode || 500).json(responseWithError(err));
});

module.exports = app;
