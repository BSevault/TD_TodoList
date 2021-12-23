// process.env.VARIABLE : ref. à VARIABLE définie dans le fichier .env
require('dotenv').config({ path: `./config/${process.env.NODE_ENV}.env` });
// console.log(process.env);

/** Importe le package express*/
const express = require('express');

const app = express();

/** Middleware json d'express. Pemret de parser du json */
app.use(express.json());

/** Route principale xxx/api */
app.get('/api', ( _ , res) => {
    res.status(200).json({ success: "Todos API v1" });
});

/** Mets le préfixe "/api" en amont de toutes les routes du router todos.js */
const todosRoute = require('./routes/todos');
app.use('/api', todosRoute);



app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});

/** Database */
