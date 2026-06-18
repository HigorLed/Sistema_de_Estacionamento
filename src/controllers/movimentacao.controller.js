const { Prisma } = require("@prisma/client");
const db = require("../data/prisma");

async function obterTodos(req, res) {
    try {
        const dados = await db.movimentacao.findMany({
            include: {
                usuario: true,
                vaga: true,
                veiculo: true,
            },
        });

        const resposta = dados.map((mov) => ({
            id: mov.id,
            dataEntrada: mov.dataEntrada,
            dataSaida: mov.dataSaida,
            valorHora: mov.valorHora,
            valorTotal: mov.valorTotal,
            status: mov.status,
            usuario: mov.usuario.nome,
            vaga: mov.vaga.numero,
            veiculo: mov.veiculo.placa,
        }));

        return res.status(200).json(resposta);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ mensagem: "Falha interna no servidor" });
    }
}

async function registrarEntrada(req, res) {
    const payload = { ...req.body };

    if (!payload.valorHora || !payload.veiculoId || !payload.vagaId || !payload.usuarioId) {
        return res.status(400).json({
            mensagem: "Os campos valorHora, veiculoId, vagaId e usuarioId são obrigatórios.",
        });
    }

    payload.valorTotal = payload.valorTotal || 0;

    if (payload.status && payload.status !== "ABERTO") {
        return res.status(400).json({
            mensagem: "Ao registrar entrada, o status precisa ser ABERTO.",
        });
    }

    if (
        isNaN(Number(payload.valorHora)) ||
        isNaN(Number(payload.veiculoId)) ||
        isNaN(Number(payload.vagaId)) ||
        isNaN(Number(payload.usuarioId))
    ) {
        return res.status(400).json({
            mensagem: "Os campos valorHora, veiculoId, vagaId e usuarioId devem ser numéricos.",
        });
    }

    try {
        const vagaSelecionada = await db.vaga.findUnique({
            where: {
                id: Number(payload.vagaId),
            },
        });

        if (vagaSelecionada?.status === "OCUPADA") {
            return res.status(400).json({
                mensagem: "Vaga indisponível: já se encontra ocupada.",
            });
        }

        if (vagaSelecionada?.status === "MANUNTENCAO") {
            return res.status(400).json({
                mensagem: "Vaga indisponível: em manutenção no momento.",
            });
        }

        payload.valorHora = Number(payload.valorHora);
        payload.usuarioId = Number(payload.usuarioId);
        payload.veiculoId = Number(payload.veiculoId);
        payload.vagaId    = Number(payload.vagaId);

        const entradaCriada = await db.movimentacao.create({
            data: payload,
        });

        if (vagaSelecionada) {
            await db.vaga.update({
                where: { id: payload.vagaId },
                data: { status: "OCUPADA" },
            });
        }

        return res.status(201).json(entradaCriada);
    } catch (err) {
        if (
            err instanceof Prisma.PrismaClientKnownRequestError &&
            err.code === "P2003"
        ) {
            return res.status(400).json({
                mensagem: "Usuário, veículo ou vaga não encontrados.",
            });
        }

        console.error(err);
        return res.status(500).json({
            mensagem: "Falha interna no servidor",
        });
    }
}

async function registrarSaida(req, res) {
    const { id } = req.params;
    const { dataSaida } = req.body;

    if (!dataSaida) {
        return res.status(400).json({
            mensagem: "A data de saída é obrigatória.",
        });
    }

    if (isNaN(Date.parse(dataSaida))) {
        return res.status(400).json({
            mensagem: "Data de saída em formato inválido.",
        });
    }

    if (!id || isNaN(Number(id))) {
        return res.status(400).json({
            mensagem: "O ID informado é inválido.",
        });
    }

    try {
        const movimentacao = await db.movimentacao.findUnique({
            where: {
                id: Number(id),
            },
        });

        if (!movimentacao) {
            return res.status(404).json({
                mensagem: "Registro de movimentação não localizado.",
            });
        }

        if (movimentacao.status === "FINALIZADA") {
            return res.status(400).json({
                mensagem: "Movimentação já encerrada anteriormente.",
            });
        }

        const diffMs =
            new Date(dataSaida).getTime() -
            new Date(movimentacao.dataEntrada).getTime();

        const totalHoras = Math.floor(diffMs / (1000 * 60 * 60));

        if (totalHoras < 0) {
            return res.status(400).json({
                mensagem: "A saída não pode ser anterior à entrada.",
            });
        }

        const movimentacaoEncerrada = await db.movimentacao.update({
            where: {
                id: Number(id),
            },
            data: {
                dataSaida: new Date(dataSaida),
                valorTotal: movimentacao.valorHora * totalHoras,
                status: "FINALIZADA",
            },
        });

        await db.vaga.update({
            where: {
                id: movimentacao.vagaId,
            },
            data: {
                status: "LIVRE",
            },
        });

        return res.status(200).json(movimentacaoEncerrada);
    } catch (err) {
        if (
            err instanceof Prisma.PrismaClientKnownRequestError &&
            err.code === "P2025"
        ) {
            return res.status(404).json({
                mensagem: "Registro de movimentação não localizado.",
            });
        }

        console.error(err);
        return res.status(500).json({
            mensagem: "Falha interna no servidor",
        });
    }
}

module.exports = {
    obterTodos,
    registrarEntrada,
    registrarSaida,
};