DROP TABLE IF EXISTS files;

DROP TABLE IF EXISTS comments;

DROP TABLE IF EXISTS threads;

DROP TABLE IF EXISTS rules;

DROP TABLE IF EXISTS boards;


CREATE TABLE boards (
    id serial PRIMARY KEY,
    tag text NOT NULL UNIQUE CHECK (length(tag) < 10),
    title text NOT NULL CHECK (length(title) < 40),
    description text NOT NULL CHECK (length(description) < 500),
    default_name text NOT NULL DEFAULT 'Anonymous' CHECK (length(default_name) < 30),
    name_change_allowed boolean NOT NULL DEFAULT TRUE,
    max_threads integer NOT NULL DEFAULT 100,
    bumplimit integer NOT NULL DEFAULT 500,
    max_message_length integer NOT NULL DEFAULT 8192,
    allowed_file_types text[], 
    max_file_size integer NOT NULL DEFAULT 3145728,
    enabled boolean NOT NULL DEFAULT TRUE,
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
    board_id integer REFERENCES boards (id),
    creation_date timestamp NOT NULL DEFAULT now(),
    bump_date timestamp
);

CREATE TABLE comments (
<<<<<<< HEAD
    id serial PRIMARY KEY,
    comment_id integer NOT NULL,
    thread_id integer REFERENCES threads(id),
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
    extension text NOT NULL CHECK (length(extension) < 50),
    full_link text NOT NULL CHECK (length(full_link) < 400),
    compressed_link text CHECK (length(compressed_link) < 400),
    creation_date timestamp NOT NULL DEFAULT now()
=======
    id SERIAL PRIMARY KEY,
    comment_id INTEGER NOT NULL,
    thread_id INTEGER REFERENCES threads(id),
    comment_number INTEGER NOT NULL,
    title TEXT NOT NULL CHECK(length(title) < 200),
    message TEXT NOT NULL CHECK(length(message) < 8192),
    user_name TEXT NOT NULL CHECK(length(user_name) < 40),
    file_link TEXT,
    file_link_commpressed TEXT,
    original_filename TEXT,
    sage BOOLEAN NOT NULL DEFAULT false,
    creation_date TIMESTAMP NOT NULL DEFAULT now()
>>>>>>> 27d5fd21ca8b553fbbcfa62b8222f585ac9d2f82
);


CREATE OR REPLACE FUNCTION set_comment_id ()
    RETURNS TRIGGER
    AS $$
BEGIN
    SELECT
        count(1) INTO NEW.comment_id
    FROM
        comments
    WHERE
        thread_id = NEW.thread_id;
    RETURN NEW;
END;
$$
LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER "set_comment_id"
    BEFORE INSERT ON comments
    FOR EACH ROW
    EXECUTE PROCEDURE "set_comment_id" ();

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
    DECLARE board_bumplimit int;
BEGIN
    SELECT
        count(1) INTO number_of_comments
    FROM
        comments
    WHERE
        thread_id = thread_qid;
    SELECT
        bumplimit INTO board_bumplimit
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
    IF number_of_comments >= board_bumplimit THEN
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

