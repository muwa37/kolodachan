import { getRules } from '../API/info';
import { InfoBlock } from '../components/common/InfoBlock';

export const Rules = () => {
  const { title, info } = getRules();

  return (
    <section className='flex flex-col w-full h-full items-center justify-evenly'>
      <h1 className='text-6xl font-extrabold'>rules</h1>
      <div className='h-full w-full flex flex-col items-start justify-start'>
        <InfoBlock title={title} info={info} />
      </div>
    </section>
  );
};
