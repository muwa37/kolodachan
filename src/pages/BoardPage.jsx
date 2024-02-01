import {useParams} from 'react-router-dom';
import {getOneBoard} from '../API/boards.js';
import BoardThreadsList from '../components/board/BoardThreadsList.jsx';
import BoardHeader from '../components/board/BoardHeader';

const BoardPage = () => {
    const params = useParams();
    const board = getOneBoard(params.boardId);

    return (
        <div>
            board page
            <div>
                url id: {params.boardId}
            </div>
            <div>
                title: {board.title}
            </div>
            <BoardHeader/>
            <BoardThreadsList/>
        </div>
    )
}

export default BoardPage;