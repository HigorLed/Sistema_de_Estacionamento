const express = require("express");
const router = express.Router();

const clienteController = require("../controllers/cliente.controller");

/**
 * @swagger
 * /clientes:
 *   get:
 *     summary: Retorna todos os clientes registrados
 *     tags: [Clientes]
 *     responses:
 *       200:
 *         description: Listagem realizada com sucesso.
 */
router.get("/", clienteController.buscarTodos);

/**
 * @swagger
 * /clientes:
 *   post:
 *     summary: Realiza o cadastro de um novo cliente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - cpf
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "João Melo"
 *               cpf:
 *                 type: string
 *                 example: "12345678901"
 *               telefone:
 *                 type: string
 *                 example: "11987654321"
 *     responses:
 *       201:
 *         description: Cliente registrado com sucesso.
 *       400:
 *         description: Requisição com dados inválidos.
 *         content:
 *           application/json:
 *             examples:
 *               camposObrigatorios:
 *                 summary: Campos obrigatórios não informados
 *                 value:
 *                   mensagem: "Nome e CPF são campos obrigatórios."
 *               cpfDuplicado:
 *                 summary: CPF já cadastrado
 *                 value:
 *                   mensagem: "O CPF informado já está cadastrado."
 *               tamanhoCpf:
 *                 summary: CPF com número de dígitos incorreto
 *                 value:
 *                   mensagem: "O CPF deve conter exatamente 11 dígitos."
 *               cpfInvalido:
 *                 summary: CPF com caracteres não numéricos
 *                 value:
 *                   mensagem: "O CPF deve conter apenas números."
 *       500:
 *         description: Falha interna no servidor.
 */
router.post("/", clienteController.novoCliente);

module.exports = router;