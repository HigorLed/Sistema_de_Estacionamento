const express = require("express");
const router = express.Router();

const movimentacaoController = require("../controllers/movimentacao.controller");

/**
 * @swagger
 * /movimentacoes:
 *   get:
 *     summary: Lista todas as movimentações registradas
 *     tags: [Movimentacoes]
 *     responses:
 *       200:
 *         description: Movimentações recuperadas com sucesso.
 */
router.get("/", movimentacaoController.obterTodos);

/**
 * @swagger
 * /movimentacoes/entrada:
 *   post:
 *     summary: Registra a entrada de um veículo no estacionamento
 *     tags: [Movimentacoes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - valorHora
 *               - veiculoId
 *               - vagaId
 *               - usuarioId
 *             properties:
 *               valorHora:
 *                 type: number
 *                 example: 12.50
 *               status:
 *                 type: string
 *                 example: "ABERTO"
 *               veiculoId:
 *                 type: integer
 *                 example: 3
 *               vagaId:
 *                 type: integer
 *                 example: 7
 *               usuarioId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Entrada registrada com sucesso.
 *       400:
 *         description: Requisição com dados inválidos.
 *         content:
 *           application/json:
 *             examples:
 *               camposObrigatorios:
 *                 summary: Campos obrigatórios não informados
 *                 value:
 *                   mensagem: "Os campos valorHora, veiculoId, vagaId e usuarioId são obrigatórios."
 *               statusInvalido:
 *                 summary: Status diferente de ABERTO
 *                 value:
 *                   mensagem: "Ao registrar entrada, o status precisa ser ABERTO."
 *               vagaOcupada:
 *                 summary: Vaga indisponível por estar ocupada
 *                 value:
 *                   mensagem: "Vaga indisponível: já se encontra ocupada."
 *               vagaEmManutencao:
 *                 summary: Vaga indisponível por manutenção
 *                 value:
 *                   mensagem: "Vaga indisponível: em manutenção no momento."
 *               idsInvalidos:
 *                 summary: Referências inexistentes
 *                 value:
 *                   mensagem: "Usuário, veículo ou vaga não encontrados."
 *       500:
 *         description: Falha interna no servidor.
 */
router.post("/entrada", movimentacaoController.registrarEntrada);

/**
 * @swagger
 * /movimentacoes/saida/{id}:
 *   put:
 *     summary: Encerra uma movimentação em aberto
 *     tags: [Movimentacoes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da movimentação a ser encerrada
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - dataSaida
 *             properties:
 *               dataSaida:
 *                 type: string
 *                 example: "2026-05-10 18:00:00"
 *     responses:
 *       200:
 *         description: Movimentação encerrada com sucesso.
 *       400:
 *         description: Dados inválidos na requisição.
 *         content:
 *           application/json:
 *             examples:
 *               campoObrigatorio:
 *                 summary: Data de saída ausente
 *                 value:
 *                   mensagem: "A data de saída é obrigatória."
 *               formatoInvalido:
 *                 summary: Formato de data incorreto
 *                 value:
 *                   mensagem: "Data de saída em formato inválido."
 *               horarioInvalido:
 *                 summary: Saída anterior à entrada
 *                 value:
 *                   mensagem: "A saída não pode ser anterior à entrada."
 *               movimentacaoEncerrada:
 *                 summary: Movimentação já finalizada
 *                 value:
 *                   mensagem: "Movimentação já encerrada anteriormente."
 *       404:
 *         description: Movimentação não localizada.
 *       500:
 *         description: Falha interna no servidor.
 */
router.put("/saida/:id", movimentacaoController.registrarSaida);

module.exports = router;