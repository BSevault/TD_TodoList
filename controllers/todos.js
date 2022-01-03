/** controllers/todos */

/** fake database */
const todos = [
    { id: 1, texte: "Première tache" },
    { id: 2, texte: "Deuxième tache" },
    { id: 3, texte: "Troisième tache" },
];

/** Avec mariadb */

/** Importer le pool database */
// const pool = require("../config/database"); plus nécessaire car contenue dans call

const { call } = require("../utils");

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
};

module.exports = {
    /** Insérer une todo */
    insertTodo: async (req, res) => {
        const { texte } = req.body;
        await call(res, async (connexion) => {
            const result = await connexion.query("CALL insertTodo(?);", [texte]);
            return res.status(200).json({ success: result });
        });
    },

    /** Afficher toutes les todo */
    getAllTodos: async (_, res) => {
        await call(res, async (connexion) => {
            const result = await connexion.query("CALL getAllTodos;");
            return res.status(200).json({ success: "Voici la liste des todos. ", task: result });
        });
    },

    /** Afficher une todo */
    getTodoById: async (req, res) => {
        const { id } = req.params;
        await call(res, async (connexion) => {
            const result = await connexion.query("CALL getTodoById(?);", [id]);
            return res.status(200).json({ success: result });
        });
    },

    /**Mettre à jour une todo */
    updateTodoById: async (req, res) => {
        const { id } = req.params;
        const { texte } = req.body;
        await call(res, async (connexion) => {
            const result = await connexion.query("CALL updateTodoById(?,?);", [id, texte]);
            return res.status(200).json({ success: `La todo ${id} a bien été mise à jour. `, task: result });
        });
    },

    /** Supprimer toutes les todos */
    deleteAllTodos: async ( _ , res) => {
        await call(res, async (connexion) => {
            const result = await connexion.query("CALL deleteAllTodos();");
            return res.status(200).json({ success: "Toutes les todos ont été supprimées. ", task: result });
        });
    },

    /** Supprimer une todo */
    deleteTodoById: async (req, res) => {
        const { id } = req.params;
        await call(res, async (connexion) => {
            const result = await connexion.query("CALL deleteTodoById(?);", [id]);
            return res.status(200).json({ success : `La todo ${id} a été supprimée. `, task: result });
        });
    },
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
//         res.status(200).json({ success: "Les todos ont bien été supprimées !", todos });
//     },

//     /** Supprimer une todo */
//     deleteTodo: (req, res) => {
//         const { id }  = req.params;
//         const index = todos.findIndex( todo => id == todo.id);
//         todos.splice(index,1);
//         res.status(200).json({ success: `La todo ${id} a bien été supprimée !` , todos });
//     }
// };
