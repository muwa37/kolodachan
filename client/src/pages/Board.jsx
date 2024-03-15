import { useParams } from 'react-router-dom';
import { getOneBoard } from '../API/boards.js';
import BoardHeader from '../components/board/BoardHeader';
import BoardThreadsList from '../components/board/BoardThreadsList.jsx';

export const Board = () => {
  const params = useParams();
  const board = getOneBoard(params.boardId);

  return (
    <div>
      board page
      <div>url id: {params.boardId}</div>
      <div>title: {board.title}</div>
      <BoardHeader />
      <BoardThreadsList />
    </div>
  );
};
