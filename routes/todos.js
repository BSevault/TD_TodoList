/** routes/todos */

const router = require('express-promise-router')();

const { getAllTodos, insertTodo, getTodoById, updateTodoById, deleteTodoById, deleteAllTodos } = require('../controllers/todos');

router
    .route('/todos')
    .post(insertTodo)
    .get(getAllTodos)
    .delete(deleteAllTodos);    

router
    .route('/todos/:id')
    .get(getTodoById)
    .put(updateTodoById)
    .delete(deleteTodoById);

router
    .route('/test');



module.exports = router;

/**REST express app */