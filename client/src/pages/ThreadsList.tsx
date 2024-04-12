import { getThreads } from '../API/threads';
import { CardList } from '../components/common/CardList';

export const ThreadsList = () => {
  const threads = getThreads();

  return (
    <section className='flex flex-col w-full h-full items-center justify-evenly'>
      <div>
        <h1 className='text-6xl font-extrabold'>all threads</h1>
      </div>
      <CardList threadCards={threads} />
    </section>
  );
};
