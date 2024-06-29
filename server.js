const express = require("express");
const swaggerUi = require("swagger-ui-express");
const bodyParser = require("body-parser");

const swaggerSpec = require("./config/swagger");
const generateResponse = require("./utils/response");
const feedRoutes = require("./routes/feed");

const app = express();
const port = 8080;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// server public folder statically
app.use(express.static("public"));

app.use("/feed/api", feedRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((req, res, next) => {
  const error = new Error(`No route found for ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message =
    error.errorMessage ||
    "An error occurred while trying to process your request. Please try again later.";
  const data = null;
  const success = false;
  res.status(status).json(generateResponse(status, success, message, data));
});

app.listen(port, function () {
  console.log("Server running at http://localhost:" + port);
});
