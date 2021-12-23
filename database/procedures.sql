USE todo_dev;

DELIMITER // 

CREATE OR REPLACE PROCEDURE insertTodo(IN p_texte VARCHAR(255))
BEGIN
    INSERT INTO todo (texte)
    VALUES (p_texte);
END //

CREATE OR REPLACE PROCEDURE getAllTodos()
BEGIN
    SELECT * FROM todo;
END //

CREATE OR REPLACE PROCEDURE getTodoById(IN p_id INT)
BEGIN
    SELECT * FROM todo WHERE id = p_id;
END //

CREATE OR REPLACE PROCEDURE updateTodoById(IN p_id INT, IN p_texte VARCHAR(255))
BEGIN
    UPDATE todo SET texte = p_texte WHERE id = p_id;
    SELECT * FROM todo WHERE id = p_id;
END //

CREATE OR REPLACE PROCEDURE deleteAllTodos()
BEGIN
    DELETE FROM todo;
END //

CREATE OR REPLACE PROCEDURE deleteTodoById(IN p_id INT)
BEGIN
    DELETE FROM todo WHERE id = p_id;
END //
