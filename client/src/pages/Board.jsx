import { useParams } from 'react-router-dom';
import { getOneBoard } from '../API/boards.js';
import { BoardHeader } from '../components/board/BoardHeader';
import { BoardThreadsList } from '../components/board/BoardThreadsList.jsx';
import { PostForm } from '../components/common/PostForm.jsx';

export const Board = () => {
  const { boardId } = useParams();
  const { title, description, info, img } = getOneBoard(boardId);

  return (
    <div className='flex flex-col justify-between items-center'>
      <BoardHeader
        title={title}
        description={description}
        info={info}
        img={img}
      />
      <PostForm parentId={title} />
      <BoardThreadsList boardId={title} />
    </div>
  );
};
