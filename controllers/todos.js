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
module.exports = {
    /** Insérer une todo */
    insertTodo: async (req, res) => {
        const { texte } = req.body;
        let connexion;
        try {
            connexion = await pool.getConnection();
            const result = await connexion.query('CALL insertTodo(?);',[texte]);
            console.log(result);
            return res.status(200).json({ succes: result });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        } finally {
            if (connexion) connexion.end;
        };
    },

    /** Afficher toutes les todo */
    getAllTodos: async ( _ , res) => {
        let connexion;
        try {
            connexion = await pool.getConnection();
            const result = await connexion.query('CALL getAllTodos();');
            console.log(result);
            return res.status(200).json({ succes: result });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        } finally {
            if (connexion) connexion.end;
        }
    },

    /** Afficher une todo */
    getTodoById: async (req, res) => {
        const { id } = req.params;
        let connexion;
        try {
            connexion = await pool.getConnection();
            const result = await connexion.query('CALL getTodoById(?);',[id]);
            console.log(result);
            return res.status(200).json({ succes: result });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        } finally {
            if (connexion) connexion.end;
        }
    },

    /**Mettre à jour une todo */
    updateTodoById: async (req, res) => {
        const { id }  = req.params;
        const { texte } = req.body;
        let connexion;
        try {
            connexion = await pool.getConnection();
            const result = await connexion.query('CALL updateTodoById(?,?);', [id, texte]);
            console.log(result);
            return res.status(200).json({ succes: result });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        } finally {
            if (connexion) connexion.end;
        }
    },

    /** Supprimer toutes les todos */
    deleteAllTodos: async ( _ , res) => {
        let connexion;
        try {
            connexion = await pool.getConnection();
            const result = await connexion.query('CALL deleteAllTodos();');
            console.log(result);
            return res.status(200).json({ succes: result });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        } finally {
            if (connexion) connexion.end;
        }
    },

    /** Supprimer une todo */
    deleteTodoById: async (req, res) => {
        const { id }  = req.params;
        let connexion;
        try {
            connexion = await pool.getConnection();
            const result = await connexion.query('CALL deleteTodoById(?);',[id]);
            console.log(result);
            return res.status(200).json({ succes: result });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        } finally {
            if (connexion) connexion.end;
        }
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