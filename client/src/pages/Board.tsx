import { getThreadsByBoard } from '@/api/threads';
import { BoardHeader } from '@/components/board/BoardHeader';
import { BoardNav } from '@/components/board/BoardNav';
import { BoardThreadsList } from '@/components/board/BoardThreadsList';
import { CardList } from '@/components/common/CardList';
import { PostForm } from '@/components/common/PostForm';
import { useAppDispatch } from '@/store';
import { selectBoard } from '@/store/board/selectors';
import { fetchBoardByTag } from '@/store/board/slice';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export const Board = () => {
  const { boardId } = useParams();
  const dispatch = useAppDispatch();

  const [view, setView] = useState('scroll');
  const [sort, setSort] = useState({ type: 'date', order: 'decrease' });

  if (boardId) {
    useEffect(() => {
      dispatch(fetchBoardByTag(boardId));
    }, []);

    const { board, loadingStatus } = useSelector(selectBoard);

    const { title, description, info, image } = board;

    const toggleView = () => {
      setView(view === 'scroll' ? 'catalog' : 'scroll');
    };
    const changeSort = (newSort: { type: string; order: string }) => {
      setSort(newSort);
    };

    return loadingStatus === 'loading' ? (
      <div>loading</div>
    ) : (
      <div className='h-full w-full flex flex-col justify-start items-center'>
        <BoardHeader
          title={title}
          description={description}
          info={info}
          image={image}
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
          <CardList threadCards={getThreadsByBoard(boardId)} />
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
