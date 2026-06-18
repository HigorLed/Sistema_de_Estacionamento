const express = require("express");
const router = express.Router();

const vagaController = require("../controllers/vaga.controller");

/**
 * @swagger
 * /vagas:
 *   get:
 *     summary: Lista todas as vagas disponíveis
 *     tags: [Vagas]
 *     responses:
 *       200:
 *         description: Vagas recuperadas com sucesso.
 */
router.get("/", vagaController.obterVagas);

/**
 * @swagger
 * /vagas:
 *   post:
 *     summary: Cria uma nova vaga no estacionamento
 *     tags: [Vagas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - numero
 *               - setor
 *               - tipo
 *             properties:
 *               numero:
 *                 type: string
 *                 example: "A5"
 *               setor:
 *                 type: string
 *                 example: "A"
 *               tipo:
 *                 type: string
 *                 example: "PEQUENO"
 *               status:
 *                 type: string
 *                 example: "LIVRE"
 *     responses:
 *       201:
 *         description: Vaga criada com sucesso.
 *       400:
 *         description: Requisição com dados inválidos.
 *         content:
 *           application/json:
 *             examples:
 *               camposObrigatorios:
 *                 summary: Campos obrigatórios não informados
 *                 value:
 *                   mensagem: "Número, setor e tipo são campos obrigatórios."
 *               statusInvalido:
 *                 summary: Status não permitido
 *                 value:
 *                   mensagem: "O status informado não é permitido."
 *               vagaDuplicada:
 *                 summary: Vaga já registrada
 *                 value:
 *                   mensagem: "Já existe uma vaga com esses dados cadastrados."
 *       500:
 *         description: Falha interna no servidor.
 */
router.post("/", vagaController.novaVaga);

module.exports = router;