CREATE DATABASE snake;

CREATE TABLE players(
    player_id SERIAL PRIMARY KEY,
    player_name VARCHAR(255),
    score INT DEFAULT 0

);