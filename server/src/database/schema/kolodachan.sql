CREATE TABLE boards (
    id SERIAL PRIMARY KEY,
    uuid UUID NOT NULL DEFAULT uuid_generate_v4()
    tag TEXT NOT NULL UNIQUE CHECK (length(tag) < 10),
    title TEXT NOT NULL CHECK (length(title) < 40),
    description TEXT NOT NULL CHECK(length(description) < 500),
    default_nickname TEXT NOT NULL DEFAULT 'Anonymous' CHECK (length(default_nickname) < 30),
    allow_change_nickname BOOLEAN NOT NULL DEFAULT true,
    max_threads INTEGER NOT NULL DEFAULT 100,
    bumplimit INTEGER NOT NULL DEFAULT 500,
    max_message_length INTEGER NOT NULL DEFAULT 8192,
    enabled BOOLEAN NOT NULL DEFAULT true,
    creation_date TIMESTAMP NOT NULL DEFAULT now()
    );


CREATE TABLE threads(
    id SERIAL PRIMARY KEY,
    board_id INTEGER REFERENCES boards(id),
    creation_date TIMESTAMP NOT NULL DEFAULT now()
);


CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    thread_id INTEGER REFERENCES threads(id),
    post_number INTEGER NOT NULL,
    title TEXT NOT NULL CHECK(length(title) < 200),
    message TEXT NOT NULL CHECK(length(message) < 8192),
    creation_date TIMESTAMP NOT NULL DEFAULT now()
);


CREATE OR REPLACE FUNCTION get_new_post_number(thread_qid INT)
  RETURNS SETOF INTEGER
    AS
      $$
      BEGIN
          RETURN QUERY SELECT p.post_number + 1
              FROM posts AS p
              JOIN threads AS t ON p.thread_id = t.id
              JOIN boards AS b ON t.board_id = b.id
                WHERE b.id = (SELECT b.id FROM boards as b JOIN threads AS t ON t.board_id = b.id WHERE t.id = thread_qid)
                AND b.id = t.board_id
              ORDER BY p.post_number DESC
              LIMIT 1;
          IF NOT FOUND THEN
              RETURN QUERY SELECT 0;
          END IF;
      END;
      $$
      LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION set_new_post_number()
RETURNS trigger AS
$$
BEGIN
NEW.post_number = get_new_post_number(NEW.thread_id);
RETURN NEW;
END;
$$
LANGUAGE plpgsql;


CREATE TRIGGER "update_post_number_on_insert"
    BEFORE INSERT ON posts
    FOR EACH ROW
    EXECUTE PROCEDURE "set_new_post_number"();

