import React, { useState } from 'react';
import BackButton from './BackButton';
import { useSnackbar } from 'notistack';

const Create = (props) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');

  const { enqueueSnackbar } = useSnackbar();

  const handleSave = () => {
    const data = {
      _id: "id-" + Math.floor(Math.random() * 1000000),
      title,
      author,
      publishYear,
      done: false
    };
    enqueueSnackbar('Item created successfully', { variant: 'success' });
    props.onSave(data);
  };

  return (
    <div className='p-4'>
      <BackButton onReturn={props.onReturn} />
      <h1 className='text-3xl my-4'>Create item</h1>
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Item</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Place</label>
          <input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Quantity</label>
          <input
            type='number'
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
}

export default Create