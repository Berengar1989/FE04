// src/components/Edit.jsx
import React, { useState, useEffect } from 'react';
import BackButton from './BackButton';
import Spinner from './Spinner';
import { useSnackbar } from 'notistack';
import api from '../utils/api'; // Importujte soubor api.js

const Edit = (props) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setAuthor(props.item.author);
    setPublishYear(props.item.publishYear);
    setTitle(props.item.title);
  }, [props.item]);

  const handleEditBook = async () => {
    try {
      setLoading(true);

      const data = {
        ...props.item,
        title,
        author,
        publishYear,
      };

      // Volání funkce edit z api.js
      await api.edit(data);

      // Zavolání callbacku předaného z nadřazené komponenty po úpravě položky
      props.onSave(data);

      enqueueSnackbar('Item edited successfully', { variant: 'success' });
    } catch (error) {
      console.error('Failed to edit item', error);
      enqueueSnackbar('Failed to edit item', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-4'>
      <BackButton onReturn={props.onReturn} />
      <h1 className='text-3xl my-4'>Edit item</h1>
      {loading ? <Spinner /> : ''}
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
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Quantity</label>
          <input
            type='number'
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>
          Save
        </button>
      </div>
    </div>
  );
};

export default Edit;
