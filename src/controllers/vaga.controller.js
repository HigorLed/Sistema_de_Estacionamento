const { Prisma } = require("@prisma/client");
const db = require("../data/prisma");

async function obterVagas(req, res) {
    try {
        const vagas = await db.vaga.findMany();
        return res.status(200).json(vagas);
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            mensagem: "Falha interna no servidor",
        });
    }
}

async function novaVaga(req, res) {
    const { numero, setor, tipo, status } = req.body;

    if (!numero || !setor || !tipo) {
        return res.status(400).json({
            mensagem: "Número, setor e tipo são campos obrigatórios.",
        });
    }

    const statusValidos = ["LIVRE", "OCUPADA", "MANUNTENCAO"];

    if (status && !statusValidos.includes(status)) {
        return res.status(400).json({
            mensagem: "O status informado não é permitido.",
        });
    }

    try {
        const vagaCriada = await db.vaga.create({
            data: {
                numero,
                setor,
                tipo,
                status,
            },
        });

        return res.status(201).json(vagaCriada);
    } catch (err) {
        if (
            err instanceof Prisma.PrismaClientKnownRequestError &&
            err.code === "P2002"
        ) {
            return res.status(400).json({
                mensagem: "Já existe uma vaga com esses dados cadastrados.",
            });
        }

        console.error(err);
        return res.status(500).json({
            mensagem: "Falha interna no servidor",
        });
    }
}

module.exports = {
    obterVagas,
    novaVaga,
};