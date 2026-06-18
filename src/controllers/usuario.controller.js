const { Prisma } = require("@prisma/client");
const db = require("../data/prisma");

async function buscarTodos(req, res) {
    try {
        const usuarios = await db.usuario.findMany();
        return res.status(200).json(usuarios);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ mensagem: "Falha interna no servidor" });
    }
}

async function buscarPorId(req, res) {
    const idUsuario = Number(req.params.id);

    if (!idUsuario) {
        return res.status(400).json({
            mensagem: "É necessário informar um ID válido."
        });
    }

    try {
        const usuario = await db.usuario.findUnique({
            where: { id: idUsuario }
        });

        if (!usuario) {
            return res.status(404).json({
                mensagem: "Nenhum usuário encontrado com este ID."
            });
        }

        return res.status(200).json(usuario);
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            mensagem: "Falha interna no servidor"
        });
    }
}

async function inserir(req, res) {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({
            mensagem: "Os campos nome, email e senha são obrigatórios."
        });
    }

    try {
        const usuarioCriado = await db.usuario.create({
            data: {
                nome: String(nome),
                email: String(email),
                senha: String(senha),
            },
        });

        return res.status(201).json(usuarioCriado);
    } catch (err) {
        if (
            err instanceof Prisma.PrismaClientKnownRequestError &&
            err.code === "P2002"
        ) {
            return res.status(400).json({
                mensagem: "Já existe um cadastro com este email."
            });
        }

        console.error(err);
        return res.status(500).json({
            mensagem: "Falha interna no servidor"
        });
    }
}

async function editar(req, res) {
    const idUsuario = Number(req.params.id);
    const { nome, email, senha } = req.body;

    if (!idUsuario) {
        return res.status(400).json({
            mensagem: "É necessário informar um ID válido."
        });
    }

    if (!nome || !email || !senha) {
        return res.status(400).json({
            mensagem: "Os campos nome, email e senha são obrigatórios."
        });
    }

    try {
        const usuarioEditado = await db.usuario.update({
            where: {
                id: idUsuario,
            },
            data: {
                nome,
                email,
                senha,
            },
        });

        return res.status(200).json(usuarioEditado);
    } catch (err) {
        if (
            err instanceof Prisma.PrismaClientKnownRequestError &&
            err.code === "P2025"
        ) {
            return res.status(404).json({
                mensagem: "Nenhum usuário encontrado com este ID."
            });
        }

        if (
            err instanceof Prisma.PrismaClientKnownRequestError &&
            err.code === "P2002"
        ) {
            return res.status(400).json({
                mensagem: "Este email já pertence a outro usuário."
            });
        }

        console.error(err);
        return res.status(500).json({
            mensagem: "Falha interna no servidor"
        });
    }
}

async function remover(req, res) {
    const idUsuario = Number(req.params.id);

    if (!idUsuario) {
        return res.status(400).json({
            mensagem: "É necessário informar um ID válido."
        });
    }

    try {
        await db.usuario.delete({
            where: {
                id: idUsuario,
            },
        });

        return res.status(200).json({
            mensagem: "Usuário excluído com sucesso."
        });
    } catch (err) {
        if (
            err instanceof Prisma.PrismaClientKnownRequestError &&
            err.code === "P2025"
        ) {
            return res.status(404).json({
                mensagem: "Nenhum usuário encontrado com este ID."
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
    buscarPorId,
    inserir,
    editar,
    remover,
};