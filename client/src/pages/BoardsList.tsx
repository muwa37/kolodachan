import { getBoards } from '../API/boards';
import { CardList } from '../components/common/CardList';

export const BoardsList = () => {
  const boards = getBoards();

  return (
    <section className='flex flex-col w-full h-full items-center justify-evenly'>
      <div>
        <h1 className='text-6xl font-extrabold'>all boards</h1>
      </div>
      <CardList cards={boards} />
    </section>
  );
};
