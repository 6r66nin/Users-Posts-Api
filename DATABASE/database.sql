CREATE TABLE users (

    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR (50) NOT NULL UNIQUE,
    age INT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()

);

CREATE TABLE posts (

    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    
);


CREATE TABLE likes (
    
    user_id int NOT NULL,
    post_id int NOT NULL,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    PRIMARY KEY (user_id, post_id)
);

INSERT INTO users (username, age) VALUES 
('alex_dev', 24),
('maria_design', 29),
('carlos_web', 31),
('sofia_tech', 22),
('lucas_code', 27);

INSERT INTO posts (user_id, content) VALUES 
((SELECT id FROM users WHERE username = 'alex_dev'), '¡Hola mundo! Mi primer post en esta red.'),
((SELECT id FROM users WHERE username = 'maria_design'), '¿Qué opinan de la tendencia de Glassmorphism en 2026?'),
((SELECT id FROM users WHERE username = 'alex_dev'), 'Postgres es increíble para manejar relaciones complejas.'),
((SELECT id FROM users WHERE username = 'sofia_tech'), 'Hoy aprendí cómo funcionan los UUIDs nativos.'),
((SELECT id FROM users WHERE username = 'carlos_web'), '¿Alguien más prefiere TypeScript sobre JS puro?');

INSERT INTO likes (user_id, post_id) VALUES 

((SELECT id FROM users WHERE username = 'maria_design'), 
 (SELECT id FROM posts WHERE content LIKE '¡Hola mundo!%')),


((SELECT id FROM users WHERE username = 'sofia_tech'), 
 (SELECT id FROM posts WHERE content LIKE '¡Hola mundo!%')),

((SELECT id FROM users WHERE username = 'alex_dev'), 
 (SELECT id FROM posts WHERE content LIKE 'Hoy aprendí%')),

((SELECT id FROM users WHERE username = 'carlos_web'), 
 (SELECT id FROM posts WHERE content LIKE '¿Qué opinan%'));