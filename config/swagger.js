var path = require("path");
var swaggerJSDoc = require("swagger-jsdoc");

var swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "BLOGGING",
    version: "1.0.0",
    description: "APIs Documentation",
    contact: {
      name: "Wasim Zaman",
      email: "wasim@sairatec-solutions.com",
    },
  },
  servers: [
    {
      url: "http://localhost:8080",
      description: "Development server",
    },
  ],
};

var options = {
  swaggerDefinition: swaggerDefinition,
  apis: [
    path.join(__dirname, "../docs/swagger/postDocs.js"),
    path.join(__dirname, "../docs/swagger/userDocs.js"),
  ],
};

var swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
