CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    lock CHAR(1),
    lock_id CHAR(13),
    received_message JSON NOT NULL
);