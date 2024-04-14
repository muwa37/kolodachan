# boards
CREATE_BOARD = \
    '''
    INSERT INTO boards(
        tag,
        title,
        description,
        default_name,
        name_change_allowed,
        max_threads,
        bumplimit,
        max_message_length,
        allowed_file_types,
        max_file_size
        )
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    '''

GET_BOARDS = \
    '''
    SELECT
        tag,
        title,
        description,
        default_name,
        name_change_allowed,
        bumplimit,
        max_message_length,
        max_file_size
    FROM boards
    WHERE enabled = true
    '''

GET_BOARD = \
    '''
    SELECT
        id,
        tag,
        title,
        description,
        default_name,
        name_change_allowed,
        image,
        bumplimit,
        allowed_file_types,
        max_file_size
    FROM boards
    WHERE tag = $1
    '''

UPDATE_BOARD = \
    '''
    UPDATE boards
        SET(tag = $1,
            title = $2,
            description = $3,
            default_name = $4,
            name_change_allowed = $5,
            max_threads = $6,
            bumplimit = $7,
            max_message_length = $8,
            allowed_file_types = $9,
            max_file_size = $10)
    WHERE tag = $11
    '''

ENABLE_BOARD = \
    '''
    UPDATE boards
        SET(enabled = $1)
    WHERE tag = $2
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
    INSERT INTO threads(board_id)
    VALUES(1$)
    RETURNING id
    '''

GET_THREADS = \
    '''
    SELECT id
    FROM threads
    WHERE board_id = $1
    ORDER BY bump_date DESC
    LIMIT $2
    OFFSET $3
    '''

GET_THREAD = \
    '''
    SELECT c.thread_id
    FROM comments as c
        JOIN threads as t
        ON c.thread_id = t.id
    WHERE t.board_id = $1
        AND c.comment_number = $2
        AND c.comment_id = 0
    ORDER BY c.creation_date ASC
    '''

# TODO: make proper query for deleting thread with all comments
DELETE_THREAD = None

# comments
CREATE_COMMENT = \
    '''
    INSERT INTO comments(
            thread_id,
            title,
            message,
            user_name,
            sage
            )
    VALUES($1, $2, $3, $4, $5)
    '''

# files
