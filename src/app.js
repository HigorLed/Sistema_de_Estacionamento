const express = require("express");
const cors = require("cors");

const clienteRoute = require("./routes/Cliente.routes.js");
const usuarioRoute = require("./routes/Usuario.routes.js");
const veiculoRoute = require("./routes/Veiculo.routes.js");
const vagaRoute = require("./routes/Vaga.routes.js");
const movimentacaoRoute = require("./routes/Movimentacao.routes.js");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/clientes", clienteRoute);
app.use("/usuarios", usuarioRoute);
app.use("/veiculos", veiculoRoute);
app.use("/vagas", vagaRoute);
app.use("/movimentacoes", movimentacaoRoute);

app.get('/', (req, res) => {
    console.log("Servidor Funcionando");
});

module.exports = app;