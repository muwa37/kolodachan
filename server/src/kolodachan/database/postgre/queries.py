# boards
CREATE_BOARD = \
    '''
INSERT INTO boards (
    tag,
    title,
    image,
    description,
    default_name,
    name_change_allowed,
    max_threads,
    bump_limit,
    max_message_length,
    allowed_file_types,
    max_file_size)
VALUES (
    $1,
    $2,
    $3,
    $4,
    $5,
    $6,
    $7,
    $8,
    $9,
    $10,
    $11)
    '''

GET_MULTIPLE_BOARDS = \
    '''
    SELECT
        id,
        tag,
        image,
        title,
        description,
        default_name,
        name_change_allowed,
        bump_limit,
        max_message_length,
        allowed_file_types,
        max_file_size
    FROM
        boards
    WHERE
       is_active = TRUE
    '''

GET_ONE_BOARD = \
    '''
    SELECT
        id,
        image,
        tag,
        title,
        description,
        default_name,
        name_change_allowed,
        bump_limit,
        max_message_length,
        allowed_file_types,
        max_file_size
    FROM
        boards
    WHERE
        tag = $1
    '''

UPDATE_BOARD = \
    '''
    UPDATE
        boards
    SET
        (tag = $1,
            title = $2,
            description = $3,
            default_name = $4,
            name_change_allowed = $5,
            max_threads = $6,
            bump_limit = $7,
            max_message_length = $8,
            allowed_file_types = $9,
            max_file_size = $10)
    WHERE
        tag = $11
    '''

ENABLE_BOARD = \
    '''
    UPDATE
        boards
    SET
        (enabled = $1)
    WHERE
        tag = $2
    '''

# TODO: it dosen't work now, first need to delete all threads, comments, rules, etc.
# i'll do it later
DELETE_BOARD = \
    '''
    DELETE FROM boards
    WHERE tag = $1
    '''

# threads
CREATE_THREAD = \
    '''
    INSERT INTO threads (
        board_id)
    VALUES (
        $1)
    RETURNING
        id
    '''

GET_MULTIPLE_THREADS = \
    '''
    SELECT
        c.thread_id,
        c.id,
        c.comment_number,
        c.position_in_thread,
        c.user_name,
        c.title,
        c.message,
        c.sage,
        c.creation_date
    FROM
        threads AS t
        JOIN comments AS c ON t.id = c.thread_id
    WHERE
        t.board_id = $1
        AND c.position_in_thread = 0
    ORDER BY
        t.bump_date DESC
    LIMIT $2 OFFSET $3
    '''

GET_ONE_THREAD = \
    '''
    SELECT
        c.thread_id,
        c.id,
        c.comment_number,
        c.position_in_thread,
        c.user_name,
        c.title,
        c.message,
        c.sage,
        c.creation_date
    FROM
        comments AS c
        JOIN threads AS t ON c.thread_id = t.id
    WHERE
        t.board_id = $1
        AND c.comment_number = $2
        AND c.position_in_thread = 0
    ORDER BY
        c.creation_date ASC
    '''

# TODO: make proper query for deleting thread with all comments
DELETE_THREAD = None

# comments
CREATE_COMMENT = \
    '''
    INSERT INTO comments (
        thread_id,
        user_name,
        title,
        message,
        sage)
    VALUES (
        $1,
        $2,
        $3,
        $4,
        $5)
    RETURNING
        id,
        comment_number
    '''

CREATE_COMMENT_WITH_TN = \
    '''
    INSERT INTO comments (
        thread_id,
        user_name,
        title,
        message,
        sage)
    VALUES (
        (
        SELECT
            t.id
        FROM
            threads AS t
            JOIN comments AS c ON t.id = c.thread_id
        WHERE
            board_id = $1
            AND c.position_in_thread = 0
            AND c.comment_number = $2),
        $3,
        $4,
        $5,
        $6)
    RETURNING
        comment_number
    '''

GET_MULTIPLE_COMMENTS = \
    '''
    SELECT
        thread_id,
        id,
        comment_number,
        position_in_thread,
        user_name,
        title,
        message,
        sage,
        creation_date
    FROM
        comments
    WHERE
        thread_id = $1
    ORDER BY
        position_in_thread OFFSET $3
    LIMIT $2
    '''

GET_MULTIPLE_COMMENTS_REVERSED = \
    '''
    SELECT
        id,
        comment_number,
        thread_id,
        position_in_thread,
        user_name,
        title,
        message,
        sage,
        creation_date
    FROM
        comments
    WHERE
        thread_id = $1
    ORDER BY
        position_in_thread DESC OFFSET $3
    LIMIT $2
    '''

GET_ONE_COMMENT = \
    '''
    SELECT
        c.id,
        c.comment_number,
        c.thread_id,
        c.position_in_thread,
        c.user_name,
        c.title,
        c.message,
        c.sage,
        c.creation_date
    FROM
        comments AS c
        JOIN threads AS t ON t.id = c.thread_id
    WHERE
        t.board_id = $1
        AND c.comment_number = $2
    '''

# files
CREATE_FILE = \
    '''
    INSERT INTO files (
        comment_id,
        name,
        full_link,
        compressed_link,
        mime_type,
        size)
    VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6)
    '''

GET_MULTIPLE_FILES = \
    '''
    SELECT
        name,
        full_link,
        compressed_link,
        mime_type,
        size
    FROM
        files
    WHERE
        comment_id = $1
    ORDER BY
        creation_date
    '''
# users
CREATE_USER = \
    '''
    INSERT INTO users (username, hashed_password, email, role)
        VALUES ($1, $2, $3, $4)
    '''

GET_ONE_USER = \
    '''
    SELECT
        pid,
        username,
        hashed_password,
        email,
        role,
        is_active
    FROM
        users
    WHERE
        username = $1
    '''

# sessions
CREATE_SESSION = \
    '''
    INSERT INTO sessions(token, user_pid, valid_until)
    VALUES($1, $2, $3)
    '''

GET_USER_BY_SESSION = \
    '''
    SELECT
        u.pid,
        u.username,
        u.email,
        u.role,
        u.is_active
    FROM
        sessions AS s
        JOIN users AS u ON s.user_pid = u.pid
    WHERE
        s.token = $1
        AND s.is_active = TRUE
        AND s.valid_until > now()
    '''
