import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

const BoardPage = () => {
    const params = useParams();
    const [board, setBoard] = useState();

    useEffect(() => {
        setBoard([{title: "a"}]);
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