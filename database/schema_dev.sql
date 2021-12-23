use todo_dev;

CREATE OR REPLACE TABLE todo (
    id INT NOT NULL AUTO_INCREMENT,
    texte VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO todo (texte)
VALUES 
    ('Tache num. 1'),
    ('Tache num. 2'),
    ('Tache num. 3'),
    ('Tache num. 4'),
    ('Tache num. 5'),
    ('Tache num. 6');