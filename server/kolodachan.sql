CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS files;

DROP TABLE IF EXISTS comments;

DROP TABLE IF EXISTS threads;

DROP TABLE IF EXISTS rules;

DROP TABLE IF EXISTS boards;

DROP TABLE IF EXISTS users_actions;

DROP TABLE IF EXISTS sessions;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id serial PRIMARY KEY,
    pid UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    username text NOT NULL UNIQUE,
    hashed_password bytea NOT NULL,
    email text NOT NULL UNIQUE,
    role text NOT NULL DEFAULT 'user',
    is_active boolean NOT NULL DEFAULT TRUE,
    creation_date timestamp NOT NULL DEFAULT now()
);

INSERT INTO users (
  username,
  hashed_password,
  email,
  role
)
  VALUES(
    'admin',
    '$2b$14$dj93lpHCt2yiTGAQdeWiNOxmh3uOMMSTVkyWQIvNAhT29Nmb5ZcM6',
    'samlple@example.com',
    'superadmin'
  );

CREATE TABLE sessions (
    id serial PRIMARY KEY,
    token text NOT NULL,
    user_pid UUID NOT NULL REFERENCES users(pid),
    valid_until timestamp NOT NULL,
    is_active boolean NOT NULL DEFAULT true,
    creation_date timestamp NOT NULL DEFAULT now()
);

CREATE TABLE users_actions(
    id serial PRIMARY KEY,
    description text NOT NULL,
    user_id integer REFERENCES users(id),
    creation_date timestamp NOT NULL DEFAULT now()
);

CREATE TABLE boards (
    id serial PRIMARY KEY,
    tag text NOT NULL UNIQUE CHECK (length(tag) < 10),
    title text NOT NULL CHECK (length(title) < 40),
    image text DEFAULT '',
    description text NOT NULL CHECK (length(description) < 500),
    default_name text NOT NULL DEFAULT 'Anonymous' CHECK (length(default_name) < 30),
    name_change_allowed boolean NOT NULL DEFAULT TRUE,
    max_threads integer NOT NULL DEFAULT 100,
    bump_limit integer NOT NULL DEFAULT 500,
    max_message_length integer NOT NULL DEFAULT 8192,
    allowed_file_types text[], 
    max_file_size integer NOT NULL DEFAULT 3145728,
    is_active boolean NOT NULL DEFAULT TRUE,
    creation_date timestamp NOT NULL DEFAULT now()
);

CREATE TABLE rules (
    id serial PRIMARY KEY,
    board_id integer REFERENCES boards(id),
    title text NOT NULL CHECK (length(title) < 200),
    body text NOT NULL CHECK (length(body) < 8192),
    creation_date timestamp NOT NULL DEFAULT now()
);

CREATE TABLE threads (
    id serial PRIMARY KEY,
    board_id integer NOT NULL REFERENCES boards (id),
    creation_date timestamp NOT NULL DEFAULT now(),
    bump_date timestamp
);

CREATE TABLE comments (
    id serial PRIMARY KEY,
    position_in_thread integer NOT NULL,
    thread_id integer NOT NULL REFERENCES threads(id),
    comment_number integer NOT NULL,
    title text NOT NULL CHECK (length(title) < 200),
    message text NOT NULL CHECK (length(message) < 8192),
    user_name text NOT NULL CHECK (length(user_name) < 40),
    sage boolean NOT NULL DEFAULT FALSE,
    creation_date timestamp NOT NULL DEFAULT now()
);

CREATE TABLE files (
    id serial PRIMARY KEY,
    comment_id integer REFERENCES comments(id),
    size integer NOT NULL,
    name text NOT NULL CHECK (length(name) < 300),
    mime_type text NOT NULL CHECK (length(mime_type) < 50),
    full_link text NOT NULL CHECK (length(full_link) < 400),
    compressed_link text CHECK (length(compressed_link) < 400),
    creation_date timestamp NOT NULL DEFAULT now()
);


CREATE OR REPLACE FUNCTION set_position_in_thread ()
    RETURNS TRIGGER
    AS $$
BEGIN
    SELECT
        count(1) INTO NEW.position_in_thread
    FROM
        comments
    WHERE
        thread_id = NEW.thread_id;
    RETURN NEW;
END;
$$
LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER "set_position_in_thread"
    BEFORE INSERT ON comments
    FOR EACH ROW
    EXECUTE PROCEDURE "set_position_in_thread" ();

CREATE OR REPLACE FUNCTION set_new_comment_number ()
    RETURNS TRIGGER
    AS $$
DECLARE
    last_comment_number int;
BEGIN
    SELECT
        c.comment_number INTO last_comment_number
    FROM
        comments AS c
       JOIN threads AS t ON t.id = c.thread_id
    WHERE
        t.board_id = (
            SELECT
                board_id
            FROM
                threads
            WHERE
                id = NEW.thread_id)
    ORDER BY
        c.comment_number DESC
    LIMIT 1;
    IF NOT FOUND THEN
        NEW.comment_number = 0;
    ELSE
        NEW.comment_number = last_comment_number + 1;
    END IF;
    RETURN NEW;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER "update_comment_number_on_insert"
    BEFORE INSERT ON comments
    FOR EACH ROW
    EXECUTE PROCEDURE "set_new_comment_number" ();

CREATE OR REPLACE FUNCTION bump_limit (thread_qid int)
    RETURNS boolean
    AS $$
DECLARE
    number_of_comments int;
    DECLARE board_bump_limit int;
BEGIN
    SELECT
        count(1) INTO number_of_comments
    FROM
        comments
    WHERE
        thread_id = thread_qid;
    SELECT
        bump_limit INTO board_bump_limit
    FROM
        boards
    WHERE
        id = (
            SELECT
                board_id
            FROM
                threads
            WHERE
                id = thread_qid);
    IF number_of_comments >= board_bump_limit THEN
        RETURN TRUE;
    ELSE
        RETURN FALSE;
    END IF;
END;
$$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_bump_date ()
    RETURNS TRIGGER
    AS $$
BEGIN
    IF NEW.sage = FALSE AND bump_limit (NEW.thread_id) = FALSE THEN
        UPDATE
            threads
        SET
            bump_date = now()
        WHERE
            id = NEW.thread_id;
    END IF;
    RETURN NULL;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER update_bump_date
    AFTER INSERT ON comments
    FOR EACH ROW
    EXECUTE PROCEDURE update_bump_date ();

