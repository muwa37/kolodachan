DROP TABLE comments;
DROP TABLE threads;
DROP TABLE boards;

CREATE TABLE boards (
    id SERIAL PRIMARY KEY,
    tag TEXT NOT NULL UNIQUE CHECK (length(tag) < 10),
    title TEXT NOT NULL CHECK (length(title) < 40),
    description TEXT NOT NULL CHECK(length(description) < 500),
    default_name TEXT NOT NULL DEFAULT 'Аноним' CHECK (length(default_name) < 30),
    name_change_allowed BOOLEAN NOT NULL DEFAULT true,
    max_threads INTEGER NOT NULL DEFAULT 100,
    bumplimit INTEGER NOT NULL DEFAULT 500,
    max_message_length INTEGER NOT NULL DEFAULT 8192,
    max_file_size INTEGER NOT NULL DEFAULT 3145728,
    enabled BOOLEAN NOT NULL DEFAULT true,
    creation_date TIMESTAMP NOT NULL DEFAULT now()
    );


CREATE TABLE threads(
    id SERIAL PRIMARY KEY,
    board_id INTEGER REFERENCES boards(id),
    creation_date TIMESTAMP NOT NULL DEFAULT now(),
    bump_date TIMESTAMP
);


CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    comment_id INTEGER NOT NULL,
    thread_id INTEGER REFERENCES threads(id),
    comment_number INTEGER NOT NULL,
    title TEXT NOT NULL CHECK(length(title) < 200),
    message TEXT NOT NULL CHECK(length(message) < 8192),
    user_name TEXT NOT NULL CHECK(length(user_name) < 40),
    file TEXT,
    sage BOOLEAN NOT NULL DEFAULT false,
    creation_date TIMESTAMP NOT NULL DEFAULT now()
);


CREATE OR REPLACE FUNCTION set_comment_id()
  RETURNS TRIGGER AS
  $$
  BEGIN
    SELECT count(1) INTO new.comment_id
    FROM comments
    WHERE thread_id = NEW.thread_id;
  RETURN NEW;
  END;
  $$
LANGUAGE plpgsql;


CREATE OR REPLACE TRIGGER "set_comment_id"
  BEFORE INSERT ON comments
  FOR EACH ROW
    EXECUTE PROCEDURE "set_comment_id"();


CREATE OR REPLACE FUNCTION set_new_comment_number()
RETURNS trigger AS
$$
DECLARE last_comment_number INT; 
BEGIN
  SELECT c.comment_number INTO last_comment_number
  FROM comments AS c 
  JOIN threads AS t ON t.id = c.thread_id
    WHERE t.board_id = (
      SELECT board_id
      FROM threads
      WHERE id = NEW.thread_id)
  ORDER BY c.comment_number DESC
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
  EXECUTE PROCEDURE "set_new_comment_number"();


CREATE OR REPLACE FUNCTION bump_limit(thread_qid INT)
RETURNS BOOLEAN AS
$$
DECLARE number_of_comments INT;
DECLARE board_bumplimit INT;
BEGIN
  SELECT count(1) INTO number_of_comments 
  FROM comments 
  WHERE thread_id = thread_qid;

  SELECT bumplimit INTO board_bumplimit 
    FROM boards 
    WHERE id = (
      SELECT board_id FROM threads
      WHERE id = thread_qid);
  IF number_of_comments >= board_bumplimit THEN
    RETURN true;
  ELSE
    RETURN false;
  END IF;
END;
$$
LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION update_bump_date()
RETURNS trigger AS
$$
BEGIN
IF new.sage = false AND bump_limit(new.thread_id) = false THEN
  UPDATE threads
    SET bump_date = now()
    WHERE id = new.thread_id;
END IF;
RETURN NULL;
END;
$$
LANGUAGE plpgsql;


CREATE TRIGGER update_bump_date
  AFTER INSERT ON comments
  FOR EACH ROW
  EXECUTE PROCEDURE update_bump_date();
