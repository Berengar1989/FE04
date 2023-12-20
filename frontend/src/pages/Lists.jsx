import React, { useEffect, useState } from 'react';
import HomeMain from '../components/home/HomeMain';
import Create from '../components/Create';
import Edit from '../components/Edit';
import Delete from '../components/Delete';
import Tile from '../components/Tile';

import { MdDone, MdOutlineDelete } from 'react-icons/md';
import { MdOutlineAddBox } from 'react-icons/md';
import Modal, {closeStyle} from 'simple-react-modal'

import { AiOutlineEdit, AiOutlineFileAdd } from 'react-icons/ai';
import { BsList } from 'react-icons/bs';
import { FaCheckDouble } from 'react-icons/fa';

import api from "../utils/api";

const Lists = () => {
  const [type, setType] = useState("MAIN");
  const [data, setData] = useState([]);
  const [result, setResult] = useState("DONE");
  const [item, setItem] = useState();
  const [showType, setShowType] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newListName, setNewListName] = useState(""); // New state for the shopping list name
  const [isInputFocused, setIsInputFocused] = useState(false); // Track input focus state


  useEffect(() => {
    setResult("PENDING");
    const dtoIn = {};

    try {
      api.shoplistList(dtoIn).then(resolve => {
        setData(resolve.data)
        setResult("DONE");
      });
    } catch (er){
      console.error("load list failed!",er);
      setResult("ERROR");
    } 
  }, []);


  function onCreateClick(){
    setType("CREATE");
  }

  function onCreateSave(item){
    setData([...data, item]);
    setType("MAIN");
  }

  function onEditClick(item){
    setItem(item);
    setType("EDIT");
  }

  function onEditSave(item){
    const newData = data.map(it => { 
      if (it._id === item._id){
        const newItem = Object.assign({}, it, item);
        return newItem;
      } else return it;
    });

    setData(newData);
    setType("MAIN");
  }

  function onDeleteClick(item){
    setItem(item);
    setType("DELETE");
  }

  function onDeleteSave(item){
    const newData = data.filter(it => it._id !== item._id);
    setData(newData);
    setType("MAIN");
  }

  function onDoneClick(item){
    const newData = data.map(it => { 
      if (it._id === item._id){
        const newItem = Object.assign({}, it, {done: !it.done});
        return newItem;
      } else return it;
    });
    setData(newData);
  }
  

  function onReturn(){
    setType("MAIN");
  }

  function renderSwitch(param){
    switch(param) {
      case "MAIN": 
        return <HomeMain data={data} onCreate={onCreateClick} onEditClick={onEditClick} onDeleteClick={onDeleteClick} onDoneClick={onDoneClick}/>;
      case "CREATE": 
        return <Create onSave={onCreateSave} onReturn={onReturn}/>;  
      case "DELETE": 
        return <Delete item={item} onSave={onDeleteSave} onReturn={onReturn}/>;  
      case "EDIT": 
        return <Edit item={item} onSave={onEditSave} onReturn={onReturn}/>; 

      default:
        return 'foo';
    }
  }

  function handleModalSave() {
    // You can handle the save logic here with the new shopping list name
    const newItem = { title: newListName, done: false, author: "Some Author" };
    setData([...data, newItem]);
    setNewListName(""); // Clear the input field after saving
    setIsModalOpen(false);
    setType("MAIN");
  }

  function handleModalCancel() {
    setNewListName(""); // Clear the input field on cancel
    setIsModalOpen(false);
    setType("MAIN");
  }

  let info = data;
  if (showType){
    info = info ? info.filter(item => !item.done) : [];
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', marginTop: '1cm' }}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex', gap: '1cm' }}>
        <div>{"request status:" +  result}</div>
        <button onClick={() => setShowType(true)} title="Show completed tasks" style={{ marginRight: '1cm' }}>
          <FaCheckDouble className='text-2xl text-green-800' />
        </button>
        <button onClick={() => setShowType(false)} title="Show all lists" style={{ marginRight: '1cm' }}>
          <BsList className='text-2xl text-yellow-600 hover:text-black' />
        </button>
        <button onClick={() => setIsModalOpen(true)} title="Add a new shopping list">
          <AiOutlineFileAdd className='text-green-500 text-4xl' />
        </button>
      </div>
    </div>
    <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div>
          <h2>Enter Shopping List Name:</h2>
          <input
            type="text"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            style={{
              border: isInputFocused ? '2px solid #3498db' : '1px solid #ccc',
              padding: '5px', // Add padding for better appearance
            }}
          />
          <button
            onClick={handleModalSave}
            style={{
              backgroundColor: '#4caf50', // Green color
              color: 'white',
              padding: '10px',
              margin: '5px',
              cursor: 'pointer',
            }}
          >
            Save
          </button>
          <button
            onClick={handleModalCancel}
            style={{
              backgroundColor: '#f44336', // Red color
              color: 'white',
              padding: '10px',
              margin: '5px',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
        </div>
      </Modal>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
    
    {info.map((item, index) => (
        <div key={index} className="tile">
          <Tile item={item}></Tile>
          
        </div>
      ))}
    </div>
  </div>
);
      };

export default Lists;
