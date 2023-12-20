// shopList_maing01\mock\calls.js
  import listData from './shoplist/list.json';
  import getData from './shoplist/get.json';

  import createData from './shoplist/create.json';
  import deleteData from './shoplist/delete.json';
  
  const mockCalls = {
    
    shoplist: {

      shoplistList: async (requestData) => {
        return new Promise((res) => setTimeout(() => res(listData), 750));
      },

      shoplistGet: async (requestData) => {
        return new Promise((res) => setTimeout(() => res(getData), 500));
      },

      create: async (requestData) => {
        // Mock the server call for creating a new item
        // You can add additional logic or validation here if needed
        return Promise.resolve(createData);
      },
      delete: async (itemId) => {
        // Mock the server call for deleting an item
        // You can add additional logic or error handling here if needed
        return Promise.resolve(deleteData);
      },
    },
  };
  
  export default mockCalls;

