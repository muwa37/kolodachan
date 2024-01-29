import {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const BoardPage = ({...props}) => {
    const params = useParams();
    const route = useNavigate();
    const [board, setBoard] = useState();

    useEffect(() => {
        setBoard(undefined);
    }, [])

    return (
        <div>
            board page
            <div>{params.boardId}</div>
            {board.title}
            
        </div>
    )
}

export default BoardPage;