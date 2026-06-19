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
        "./src/routes/Cliente.routes.js",
        "./src/routes/Usuario.routes.js",
        "./src/routes/Vaga.routes.js",
        "./src/routes/Veiculo.routes.js",
        "./src/routes/Movimentacao.routes.js"
    ]
};


const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;