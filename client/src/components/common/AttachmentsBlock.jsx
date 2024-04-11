import downloadIcon from '@assets/images/icons/download.svg';

export const AttachmentsBlock = ({ attachments }) => {
  return (
    <div className='flex'>
      {attachments.map(item => (
        <div
          key={item.name}
          className='p-2 flex flex-col justify-center items-center max-w-1/4'
        >
          <div className='flex items-center justify-center'>
            <p className='text-sm font-light text-violet-600'>{item.name}</p>
            <button className='size-4 m-2'>
              <img src={downloadIcon} alt='download' />
            </button>
          </div>
          <img src={item.link} alt='related' />
        </div>
      ))}
    </div>
  );
};
