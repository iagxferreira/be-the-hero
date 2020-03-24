//Importando o Express
const express = require('express'); 

//criando a aplicação
const app = express();


//roteamento
app.get('/', (request, response) => {
    return response.json({
        evento : "Semana Omnistack 11.0",
        aluno : "Iago Ferreira"
    });    
});

//escutando na porta 3333
app.listen(3333);

