/** controllers/todos */

/** fake database */
const todos = [
    { id: 1, texte: "Première tache"},
    { id: 2, texte: "Deuxième tache"},
    { id: 3, texte: "Troisième tache"}
]


/** Importer le pool database */
const pool = require('../config/database')

/** Avec mariadb */

/** Crée une connexion à la db et appelle la procédure call avec des paramères optionnels */ 
const fetchDB = async (call, param = []) => {
    let connexion;
    try {
        connexion = await pool.getConnection();
        const result = await connexion.query(call, param);
        return result;
    } catch (error) {
        return error.message;
    } finally {
        if (connexion) connexion.end();
    }
}

module.exports = {
    /** Insérer une todo */
    insertTodo: async (req, res) => {
        const { texte } = req.body;
        const result = await fetchDB('CALL insertTodo(?);',[texte]);
        return res.status(200).json({ succes: "Une nouvelle todo a été ajoutée. ", task: result });
    },

    /** Afficher toutes les todo */
    getAllTodos: async ( _ , res) => {
        const result = await fetchDB('CALL getAllTodos;');
        return res.status(200).json({ succes: "Voici la liste des todos. ", task: result[0] });
    },

    /** Afficher une todo */
    getTodoById: async (req, res) => {
        const { id } = req.params;
        const result = await fetchDB('CALL getTodoById(?);',[id]);
        return res.status(200).json({ succes: `Voici la todo ${id} : `, task: result[0] });
    },

    /**Mettre à jour une todo */
    updateTodoById: async (req, res) => {
        const { id }  = req.params;
        const { texte } = req.body;
        const result = await fetchDB('CALL updateTodoById(?,?);', [id, texte]);
        return res.status(200).json({ succes: `La todo ${id} a bien été mise à jour. `, task: result[0] });
    },

    /** Supprimer toutes les todos */
    deleteAllTodos: async ( _ , res) => {
        const result = await fetchDB('CALL deleteAllTodos();');
        return res.status(200).json({ succes: "Toutes les todos ont été supprimées. ", task: result[0] });
    },

    /** Supprimer une todo */
    deleteTodoById: async (req, res) => {
        const { id }  = req.params;
        const result = await fetchDB('CALL deleteTodoById(?);',[id]);
        return res.status(200).json({ succes: `La todo ${id} a été supprimée. `, task: result[0] });
    }
};


/** Sans mariadb */
// module.exports = {
//     /** Afficher toutes les todo */
//     getAllTodos: ( _ , res) => {
//         res.status(200).json({ success: todos });
//     },

//     /** Insérer une todo */
//     insertTodo: (req, res) => {
//         const { id, texte } = req.body;
//         todos.push({ id, texte });
//         res.status(200).json({ success: `La tâche ${id} a été ajoutée !`, todos});
//     },

//     /** Afficher une todo */
//     getTodo: (req, res) => {
//         const { id } = req.params;
//         const filteredTodo = todos.filter( element => element.id == id);
//         res.status(200).json({ success: filteredTodo[0] });
//     },

//     /**Mettre à jour une todo */
//     updateTodo: (req, res) => {
//         const { id }  = req.params;
//         const { texte } = req.body;
//         const index = todos.findIndex(element => id == element.id);
//         todos[index].texte += " " + texte;
//         res.status(200).json({ success: `La todo ${id} a bien été mise à jour !`, todos});
//     },

//     /** Supprimer toutes les todos */
//     deleteAllTodos: ( _ , res) => {
//         todos.splice(0, todos.length);
//         res.status(200).json({ succes: "Les todos ont bien été supprimées !", todos });
//     },

//     /** Supprimer une todo */
//     deleteTodo: (req, res) => {
//         const { id }  = req.params;
//         const index = todos.findIndex( todo => id == todo.id);
//         todos.splice(index,1);
//         res.status(200).json({ success: `La todo ${id} a bien été supprimée !` , todos });
//     }
// };