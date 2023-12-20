import { AiOutlineEdit } from 'react-icons/ai';
import { MdDone, MdOutlineDelete } from 'react-icons/md';

const ItemTable = (props) => {
  return (
    <table className='w-full border-separate border-spacing-2'>
      <thead>
        <tr>
          <th className='border border-slate-600 rounded-md'>No</th>
          <th className='border border-slate-600 rounded-md'>Item</th>
          <th className='border border-slate-600 rounded-md'>
            Place
          </th>
          <th className='border border-slate-600 rounded-md max-md:hidden'>
            Quantity
          </th>
          <th className='border border-slate-600 rounded-md'>Operations</th>
        </tr>
      </thead>
      <tbody>
      {props.data.map((item, index) => (
  // Check if the item is not done before rendering the row
  !item.done && (
    <tr key={item._id} className='h-8'>
      <td className='border border-slate-700 rounded-md text-center'>
        {index + 1}
      </td>
      <td className={'border border-slate-700 rounded-md text-center' + (item.done ? '' : ' delete')}>
        {item.title}
      </td>
      <td className='border border-slate-700 rounded-md text-center'>
        {item.author}
      </td>
      <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
        {item.publishYear}
      </td>
      <td className='border border-slate-700 rounded-md text-center'>
        <div className='flex justify-center gap-x-4'>
          <button onClick={() => props.onDoneClick(item)}>
            <MdDone className='text-2xl text-green-800' /> 
          </button>
          <button onClick={() => props.onEditClick(item)}>
            <AiOutlineEdit className='text-2xl text-yellow-600' />
          </button>
          <button onClick={() => props.onDeleteClick(item)}>
            <MdOutlineDelete className='text-2xl text-red-600' />
          </button>
        </div>
      </td>
    </tr>
  )
))}
      </tbody>
    </table>
  );
};

export default ItemTable;
