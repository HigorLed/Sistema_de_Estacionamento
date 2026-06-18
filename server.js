require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = require('./src/app.js');

const PORT = process.env.PORT || 3000;

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require ("./swagger.js");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.listen(PORT, () => {
  console.log(`Servidor rodando na http://localhost:${PORT}`);
  console.log(`Servidor rodando http://localhost:${PORT}/api-docs`);
});
