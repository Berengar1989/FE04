import React, { useEffect, useState } from 'react';
import HomeMain from '../components/home/HomeMain';
import Create from '../components/Create';
import Edit from '../components/Edit';
import Delete from '../components/Delete';

import api from "../utils/api";

const defaultData = {
  "data": [
    {"_id": "id-11235446",
    "title":"klobása",
    "author":"Tesco",
    "publishYear": "1kg",
    "done": false
  },{"_id": "id-586991",
    "title":"šunka",
    "author":"Lidl",
    "publishYear": "0.5kg",
    "done": true
  }]};

const Home = () => {
  const [type, setType] = useState("MAIN");
  const [result, setResult] = useState("DONE");
  const [data, setData] = useState([]);
  const [item, setItem] = useState();

  useEffect(() => {
    setResult("PENDING");
    const dtoIn = { id: 1 };
    try {
      api.shoplistGet(dtoIn).then(resolve => {
        setData(resolve.data)
        setResult("DONE");
      });
    } catch (er){
      console.error("load detail failed!",er);
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
  
  function onMarkListAsCompleted() {
    const newData = data.map(item => ({ ...item, done: true }));
    setData(newData);
  }

  function onReturn(){
    setType("MAIN");
  }

  function renderSwitch(param){
    switch(param) {
      case "MAIN": 
      return (
        <HomeMain
          result={result}
          data={data}
          onCreate={onCreateClick}
          onEditClick={onEditClick}
          onDeleteClick={onDeleteClick}
          onDoneClick={onDoneClick}
          onMarkListAsCompleted={onMarkListAsCompleted}
        />
      );
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

  return (
    <>
      {renderSwitch(type)}
    </>);
};


export default Home;
