const express = require("express");
const swaggerUi = require("swagger-ui-express");
const bodyParser = require("body-parser");

const swaggerSpec = require("./config/swagger");

const app = express();
const port = 8080;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, function () {
  console.log("Server running at http://localhost:" + port);
});
