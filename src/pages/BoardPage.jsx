import {useState} from 'react';
import {useParams} from 'react-router-dom';
import {getOneBoard} from '../API/boards.js';
import BoardThreadList from '../components/board/BoardThreadList.jsx';
import BoardHeader from '../components/board/BoardHeader';

const BoardPage = ({...props}) => {
    const params = useParams();
    const [board, setBoard] = useState(getOneBoard(params.boardId));

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
            <BoardThreadList/>
        </div>
    )
}

export default BoardPage;