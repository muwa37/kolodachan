import { useRouteError } from 'react-router-dom';
import kolodaErrorImg from '../assets/images/static/koloda-error.png';
import { Footer } from '../components/wrapper/Footer';
import { Navbar } from '../components/wrapper/Navbar';

export const Error = () => {
  const error = useRouteError();

  return (
    <div className='mx-0 py-4 px-2 h-screen w-full flex flex-col justify-between text-teal-800 bg-slate-400'>
      <Navbar />
      <section className='flex w-full h-full items-center justify-evenly'>
        <div className='h-2/3 flex flex-col justify-evenly items-center'>
          <h1 className='text-6xl font-extrabold'>Error</h1>
          <h2 className='text-2xl font-semibold text-center'>
            {error.message || error.data}
          </h2>
        </div>
        <div className='flex justify-center items-center w-1/2 h-full'>
          <img
            className=' h-2/3 saturate-50 opacity-75 drop-shadow-2xl blur-[0.5px]'
            src={kolodaErrorImg}
            alt='error'
          />
        </div>
      </section>
      <Footer />
    </div>
  );
};
