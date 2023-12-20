import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdDone, MdOutlineDelete } from 'react-icons/md';
import { FaSearch } from 'react-icons/fa';
import { useSnackbar } from 'notistack';
import api from '../utils/api';  // Upravte cestu podle struktury vaší aplikace

const ItemSingleCard = (props) => {
  const { item } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [newShoplistName, setNewShoplistName] = useState('');

  const handleEditShoplistName = async () => {
    try {
      // Zavolejte API pro aktualizaci názvu shoplistu
      await api.updateShoplistName(item.shoplistId, newShoplistName);
      enqueueSnackbar('Shoplist name updated successfully', { variant: 'success' });
    } catch (error) {
      console.error('Error updating shoplist name:', error);
      enqueueSnackbar('Failed to update shoplist name', { variant: 'error' });
    }
  };

  return (
    <div className='border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl'>
      <h2 className='absolute top-1 right-2 px-4 py-1 bg-red-300 rounded-lg'>
        {item.publishYear}
      </h2>
      <h4 className='my-2 text-gray-500'>{item._id}</h4>
      <div className='flex justify-start items-center gap-x-2'>
        <FaSearch className='text-red-300 text-2xl' />
        <h2 className={'my-1' + (item.done ? ' line-through' : '')}>{item.title}</h2>
        <Link to="./detail" className="mylink" title="View details">
          <FaSearch className='text-blue-500 text-lg' />
        </Link>
      </div>
      <div className='flex justify-start items-center gap-x-2'>
        <BiUserCircle className='text-red-300 text-2xl' />
        <h2 className='my-1'>{item.author}</h2>
      </div>
      {/* Tlačítko pro změnu názvu shoplistu */}
      <div className='flex justify-start items-center gap-x-2'>
        <input
          type='text'
          value={newShoplistName}
          onChange={(e) => setNewShoplistName(e.target.value)}
          placeholder='New shoplist name'
          className='border-2 border-gray-500 px-4 py-2 w-full'
        />
        <button
          className='p-2 bg-sky-300 m-2'
          onClick={handleEditShoplistName}
        >
          Update Shoplist Name
        </button>
      </div>
    </div>
  );
};

export default ItemSingleCard;
