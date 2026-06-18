const { Prisma } = require("@prisma/client");
const db = require("../data/prisma");

async function buscarTodos(req, res) {
    try {
        const clientes = await db.client.findMany();
        return res.status(200).json(clientes);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ mensagem: "Falha interna no servidor" });
    }
}

async function novoCliente(req, res) {
    const { nome, cpf, ...dadosExtras } = req.body;

    if (!nome || !cpf) {
        return res.status(400).json({
            mensagem: "Nome e CPF são campos obrigatórios."
        });
    }

    const cpfString = String(cpf);

    if (cpfString.length !== 11) {
        return res.status(400).json({
            mensagem: "CPF inválido: deve ter exatamente 11 dígitos."
        });
    }

    if (isNaN(Number(cpfString))) {
        return res.status(400).json({
            mensagem: "CPF inválido: utilize somente números."
        });
    }

    try {
        const clienteCriado = await db.client.create({
            data: {
                nome,
                cpf,
                ...dadosExtras
            }
        });

        return res.status(201).json(clienteCriado);
    } catch (err) {
        if (
            err instanceof Prisma.PrismaClientKnownRequestError &&
            err.code === "P2002"
        ) {
            return res.status(400).json({
                mensagem: "CPF já cadastrado no sistema."
            });
        }

        console.error(err);
        return res.status(500).json({
            mensagem: "Falha interna no servidor"
        });
    }
}

module.exports = {
    buscarTodos,
    novoCliente,
};