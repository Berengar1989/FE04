import React, { useState } from 'react';
import { MdOutlineAddBox } from 'react-icons/md';
import ItemTable from './ItemTable';
import ItemCard from './ItemCard';
import { Link } from 'react-router-dom';

const HomeMain = (props) => {

  const [showType, setShowType] = useState('table');

  return (
    <div className='p-4'>
      <div className='flex justify-center items-center gap-x-4'>
        <div>{"request status:" +  props.result}</div>
        <button
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('table')}
        >
          All
        </button>
        <button
          className='bg-red-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('card')}
        >
          not done
        </button>
        <button className='bg-yellow-300 hover:bg-yellow-800 px-4 py-1 -'>
        <Link to="/" className={"mylink"}>Home</Link> 
        </button>
      </div>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Shopping List</h1>
        <button onClick={props.onCreate}>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </button>
        </div>
      {showType === 'table' ? (
        <ItemTable data={props.data} onEditClick={props.onEditClick} onDeleteClick={props.onDeleteClick} onDoneClick={props.onDoneClick}/>
      ) : (
        <ItemCard data={props.data} onEditClick={props.onEditClick} onDeleteClick={props.onDeleteClick} onDoneClick={props.onDoneClick}/>
      )}
    </div>
  );
  
};
 
export default HomeMain;

