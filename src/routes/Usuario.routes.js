const express = require("express");
const router = express.Router();

const usuarioController = require("../controllers/usuario.controller");

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Lista todos os usuários do sistema
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Usuários recuperados com sucesso.
 */
router.get("/", usuarioController.buscarTodos);

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Localiza um usuário pelo seu ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário encontrado com sucesso.
 *       404:
 *         description: Nenhum usuário encontrado com este ID.
 *       500:
 *         description: Falha interna no servidor.
 */
router.get("/:id", usuarioController.buscarPorId);

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Cria um novo usuário no sistema
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - senha
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Carlos Souza"
 *               email:
 *                 type: string
 *                 example: "carlos@email.com"
 *               senha:
 *                 type: string
 *                 example: "senha123"
 *               perfil:
 *                 type: string
 *                 example: "Funcionario"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso.
 *       400:
 *         description: Requisição com dados inválidos.
 *         content:
 *           application/json:
 *             examples:
 *               camposObrigatorios:
 *                 summary: Campos obrigatórios não informados
 *                 value:
 *                   mensagem: "Os campos nome, email e senha são obrigatórios."
 *               emailDuplicado:
 *                 summary: Email já registrado
 *                 value:
 *                   mensagem: "Já existe um cadastro com este email."
 *       500:
 *         description: Falha interna no servidor.
 */
router.post("/", usuarioController.inserir);

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Atualiza os dados de um usuário existente
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Rafael Lima"
 *               email:
 *                 type: string
 *                 example: "rafael@email.com"
 *               senha:
 *                 type: string
 *                 example: "nova456"
 *               perfil:
 *                 type: string
 *                 example: "Administrador"
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso.
 *       400:
 *         description: Dados inválidos na requisição.
 *         content:
 *           application/json:
 *             examples:
 *               camposObrigatorios:
 *                 summary: Campos obrigatórios não informados
 *                 value:
 *                   mensagem: "Os campos nome, email e senha são obrigatórios."
 *               emailDuplicado:
 *                 summary: Email já pertence a outro usuário
 *                 value:
 *                   mensagem: "Este email já pertence a outro usuário."
 *       404:
 *         description: Nenhum usuário encontrado com este ID.
 *       500:
 *         description: Falha interna no servidor.
 */
router.put("/:id", usuarioController.editar);

/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Remove um usuário do sistema
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário excluído com sucesso.
 *       400:
 *         description: ID inválido informado.
 *       404:
 *         description: Nenhum usuário encontrado com este ID.
 */
router.delete("/:id", usuarioController.remover);

module.exports = router;