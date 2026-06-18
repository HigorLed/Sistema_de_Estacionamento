const swaggerJSDoc = require("swagger-jsdoc");


const options = {

    definition : {

        openapi: "3.0.0",

        info: {
            title: "APIs do sistema academia",
            
            version: "1.0.0",

            description: "Uma documentação utilizando a API do Swagger para documentar as APIs do sistema de estacionamento"
        },

        servers: [
            {
                url: "http://localhost:3000"
            }
        ]
    },

    apis: [
        "./src/routes/cliente.route.js",
        "./src/routes/usuario.route.js",
        "./src/routes/vaga.route.js",
        "./src/routes/veiculo.route.js",
        "./src/routes/movimentacao.route.js"
    ]
};


const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;