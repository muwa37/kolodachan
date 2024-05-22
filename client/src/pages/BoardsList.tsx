import { BoardResponse } from '@/types/api';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { CardList } from '../components/common/CardList';

export const BoardsList = () => {
  const [boards, setBoards] = useState<BoardResponse[] | null>(null);

  console.log(process.env.API_URL);
  const getBoards = async () => {
    const { data } = await axios.get(process.env.API_URL + `/board`);
    console.log(data.boards);
    return data.boards;
  };

  useEffect(() => {
    getBoards().then(data => setBoards(data));
  }, []);

  if (!boards) {
    <section className='flex flex-col w-full h-full items-center justify-evenly'>
      <div>
        <h1 className='text-6xl font-extrabold'>all boards</h1>
      </div>
      <span>boards loading</span>
    </section>;
  }

  if (boards) {
    return (
      <section className='flex flex-col w-full h-full items-center justify-evenly'>
        <div>
          <h1 className='text-6xl font-extrabold'>all boards</h1>
        </div>
        <CardList boardCards={boards} />
      </section>
    );
  }
};
