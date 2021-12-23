const express = require('express');
const app = express();
app.use(express.json());





// const insertTodo = (todo) => {
//     todos.push(todo);
// };

// const updateTodo = (id, texte) => {
//     todos.filter((todo, index) => {
//         if(todo.id == id){
//             todos[index].texte = texte
//             return;
//         }
//     });
// };

// const deleteTodo = (id) => {
//     todos.forEach((element, index) => {
//         if (element.id == id) {
//             todos.splice(index, 1)
//         }
//     });
// };

/**--------------------Serveur express */
app.get('/', ( _ , res) => {
    return res.status(200).json({todos});
});

app.get('/tache/:id', (req, res) => {
    const id = req.params.id;
    return res.status(200).json({ success: `Tache ${id} : ${todos[id-1].texte}`});
});

app.post('/insertion', (req,res) => {
    const {id, texte} = req.body;
    insertTodo({ id, texte });
    return res.status(200).json({success: "La tache a bien été ajoutée !", todos});
});

app.put('/update', (req, res) => {
    const {id, texte} = req.body;
    updateTodo(id, texte);
    return res.status(200).json({success: `La tache ${id} a bien été mise à jour !`, todos});
    // res.status(400).json({error: "Id inconnue dans!", todos});
});

app.delete('/delete', (req, res) =>{
    const { id } = req.body;
    deleteTodo(id);
    return res.status(200).json({success: `La tache ${id} a bien été supprimée !`, todos});
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});