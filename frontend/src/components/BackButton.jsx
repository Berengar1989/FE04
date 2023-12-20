import { BsArrowLeft } from 'react-icons/bs';

const BackButton = ({ onReturn }) => {
  return (
    <div className='flex'>
      <button
        onClick={onReturn}
        className='bg-sky-800 text-white px-4 py-1 rounded-lg w-fit'
      > 
        <BsArrowLeft className='text-2xl' />
      </button>
    </div>
  );
};

export default BackButton;
