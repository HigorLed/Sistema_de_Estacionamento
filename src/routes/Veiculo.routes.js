const express = require("express");
const router = express.Router();

const veiculoController = require("../controllers/veiculo.controller");

/**
 * @swagger
 * /veiculos:
 *   get:
 *     summary: Lista todos os veículos registrados
 *     tags: [Veiculos]
 *     responses:
 *       200:
 *         description: Veículos recuperados com sucesso.
 */
router.get("/", veiculoController.obterVeiculos);

/**
 * @swagger
 * /veiculos:
 *   post:
 *     summary: Cadastra um novo veículo no sistema
 *     tags: [Veiculos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - placa
 *               - modelo
 *               - marca
 *               - cor
 *               - tipo
 *               - clientId
 *             properties:
 *               placa:
 *                 type: string
 *                 example: "ABC1D23"
 *               modelo:
 *                 type: string
 *                 example: "Civic"
 *               marca:
 *                 type: string
 *                 example: "Honda"
 *               cor:
 *                 type: string
 *                 example: "Prata"
 *               tipo:
 *                 type: string
 *                 example: "Sedan"
 *               clientId:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       201:
 *         description: Veículo registrado com sucesso.
 *       400:
 *         description: Dados inválidos na requisição.
 *         content:
 *           application/json:
 *             examples:
 *               camposObrigatorios:
 *                 summary: Campos obrigatórios não informados
 *                 value:
 *                   mensagem: "Preencha todos os campos obrigatórios."
 *               placaInvalida:
 *                 summary: Placa fora do padrão
 *                 value:
 *                   mensagem: "A placa precisa ter exatamente 7 caracteres."
 *               placaDuplicada:
 *                 summary: Placa já registrada
 *                 value:
 *                   mensagem: "Esta placa já está vinculada a outro veículo."
 *               clienteInexistente:
 *                 summary: Cliente não localizado
 *                 value:
 *                   mensagem: "Nenhum cliente encontrado com o ID informado."
 *       500:
 *         description: Falha interna no servidor.
 */
router.post("/", veiculoController.adicionarVeiculo);

module.exports = router;