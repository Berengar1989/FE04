// src/components/Delete.jsx
import React from 'react';
import BackButton from './BackButton';
import { useSnackbar } from 'notistack';
import api from '../utils/api'; // Importujte soubor api.js

const Delete = (props) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = async () => {
    try {
      // Volání funkce delete z api.js
      await api.delete(props.item._id);

      // Zavolání callbacku předaného z nadřazené komponenty po smazání položky
      props.onSave(props.item);

      enqueueSnackbar('Item deleted successfully', { variant: 'success' });
    } catch (error) {
      console.error('Failed to delete item', error);
      enqueueSnackbar('Failed to delete item', { variant: 'error' });
    }
  };

  return (
    <div className='p-4'>
      <BackButton onReturn={props.onReturn} />
      <h1 className='text-3xl my-4'>Delete item</h1>
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are You Sure You want to delete this item?</h3>

        <button
          className='p-4 bg-red-600 text-white m-8 w-full'
          onClick={handleDelete}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  );
};

export default Delete;
