import { getOneBoard } from '@/API/boards';
import { getThreadsByBoard } from '@/API/threads';
import { BoardHeader } from '@/components/board/BoardHeader';
import { BoardNav } from '@/components/board/BoardNav';
import { BoardThreadsList } from '@/components/board/BoardThreadsList';
import { CardList } from '@/components/common/CardList';
import { PostForm } from '@/components/common/PostForm';

import { useState } from 'react';
import { useParams } from 'react-router-dom';

export const Board = () => {
  const { boardId } = useParams();
  const [view, setView] = useState('scroll');
  const [sort, setSort] = useState({ type: 'date', order: 'decrease' });
  if (boardId) {
    const { title, description, info, img } = getOneBoard(boardId);

    const toggleView = () => {
      setView(view === 'scroll' ? 'catalog' : 'scroll');
    };
    const changeSort = (newSort: { type: string; order: string }) => {
      setSort(newSort);
    };

    return (
      <div className='h-full w-full flex flex-col justify-start items-center'>
        <BoardHeader
          title={title}
          description={description}
          info={info}
          img={img}
        />
        <PostForm parentId={title} />
        <BoardNav
          view={view}
          toggleView={toggleView}
          sort={sort}
          changeSort={changeSort}
        />
        {view === 'scroll' ? (
          <BoardThreadsList boardId={title} />
        ) : (
          <CardList cards={getThreadsByBoard(boardId)} />
        )}
      </div>
    );
  }

  return (
    <div>
      <h1>cannot find board...</h1>
    </div>
  );
};
