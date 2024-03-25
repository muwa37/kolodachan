import { useParams } from 'react-router-dom';
import { getOneBoard } from '../API/boards';
import { BoardHeader } from '../components/board/BoardHeader';
import { BoardNav } from '../components/board/BoardNav';
import { BoardThreadsList } from '../components/board/BoardThreadsList.jsx';
import { PostForm } from '../components/common/PostForm.jsx';

export const Board = () => {
  const { boardId } = useParams();
  if (boardId) {
    const { title, description, info, img } = getOneBoard(boardId);
    return (
      <div className='h-full w-full flex flex-col justify-start items-center'>
        <BoardHeader
          title={title}
          description={description}
          info={info}
          img={img}
        />
        <PostForm parentId={title} />
        <BoardNav />
        <BoardThreadsList boardId={title} />
      </div>
    );
  }

  return (
    <div>
      <h1>cannot find board...</h1>
    </div>
  );
};
