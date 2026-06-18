const { Prisma } = require("@prisma/client");
const db = require("../data/prisma");

async function obterVeiculos(req, res) {
    try {
        const veiculos = await db.veiculos.findMany({
            include: {
                client: true,
            },
        });

        const resposta = veiculos.map((item) => {
            const { client, clientId, ...infoVeiculo } = item;

            return {
                ...infoVeiculo,
                cliente: client.nome,
            };
        });

        return res.status(200).json(resposta);
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            mensagem: "Falha interna no servidor",
        });
    }
}

async function adicionarVeiculo(req, res) {
    const {
        placa,
        modelo,
        marca,
        cor,
        tipo,
        clientId,
    } = req.body;

    if (!placa || !modelo || !marca || !cor || !tipo || !clientId) {
        return res.status(400).json({
            mensagem: "Preencha todos os campos obrigatórios.",
        });
    }

    const idCliente = Number(clientId);

    if (isNaN(idCliente) || idCliente <= 0) {
        return res.status(400).json({
            mensagem: "O ID do cliente deve ser um número positivo válido.",
        });
    }

    if (String(placa).trim().length !== 7) {
        return res.status(400).json({
            mensagem: "A placa precisa ter exatamente 7 caracteres.",
        });
    }

    try {
        const veiculoCadastrado = await db.veiculos.create({
            data: {
                placa,
                modelo,
                marca,
                cor,
                tipo,
                clientId: idCliente,
            },
        });

        return res.status(201).json(veiculoCadastrado);
    } catch (err) {
        if (
            err instanceof Prisma.PrismaClientKnownRequestError &&
            err.code === "P2002"
        ) {
            return res.status(400).json({
                mensagem: "Esta placa já está vinculada a outro veículo.",
            });
        }

        if (
            err instanceof Prisma.PrismaClientKnownRequestError &&
            err.code === "P2003"
        ) {
            return res.status(400).json({
                mensagem: "Nenhum cliente encontrado com o ID informado.",
            });
        }

        console.error(err);
        return res.status(500).json({
            mensagem: "Falha interna no servidor",
        });
    }
}

module.exports = {
    obterVeiculos,
    adicionarVeiculo,
};