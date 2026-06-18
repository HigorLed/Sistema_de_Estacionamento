# Para iniciar o projeto

Use o commando npm i para baixar todas as bibliotecas utilizadas

Crie o Arquivo .env
Configure a database

Exemplo: DATABASE_URL = "mysql://(nome do usuario):(senha)@localhost:3306/(nome da tabela do banco de dados)"

Para usar essa tabela do banco de dados, garanta que ela exista no seu sistema

Depois, rodar o migration para importar as tabelas do sistema para dentro do seu banco de dados.

npx prisma migrate dev --name (nome da migration, pode escolher)

Por fim usar o prisma generate para gerar as configurações dentro do arquivo do schema.prisma. 

npx prisma generate 

Pode ser usar tanto o commando npm start tanto o npm run dev para executar o servidor

# Extras

Utilizar o comando npx prisma studio vai abrir uma janela personalizada do próprio prisma sobre o Sistema

Caso queria saber o que cada rota faz, pode acessar o swagger e verificar a documentação de APIs

Se por algum motivo o prisma der problema ou a pasta for deletada, usar os seguintes comandos

npm install prisma --save-dev

npm install @prisma/client

npx prisma init

Esses são quase todos os comandos e informações necessárias para saber como executar o servidor."# Sistema_de_Estacionamento" 
"# Sistema_de_Estacionamento" 
