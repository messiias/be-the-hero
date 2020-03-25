const express = require('express'); //Importa o modulo express para dentro da váriavel express
const cors = require('cors');
const routes = require('./routes') //Importar o Routes que foi exportado no arq routes.js

const app = express(); //Vai armazenar a aplicação

app.use(cors());
app.use(express.json()); //Transforma o objeto em Javascript, ou seja, ele entende que irá receber algo no formato JSON
app.use(routes);


app.listen(3333); //Vai mandar escutar a porta 3333, 80 é a porta padrão

