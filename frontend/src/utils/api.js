const BASE_URL = 'http://localhost:5555'; // Změňte na skutečnou adresu API

import mockCalls from "../mock/call";


const useMockData = false;

const api = {

  shoplistList: async (data) => {

    if(useMockData){

      console.log("Called shoplist/list with dtoIn:", data);
      return mockCalls.shoplist.shoplistList(data);

    } else {
      const response = await fetch(`${BASE_URL}/api/shoplist/list`, data);
      if (!response.ok) {
        throw new Error('Failed to fetch item list');
      }
      return response.json();
    }
  },


  shoplistGet: async (data) => {

    if(useMockData){

      console.log("Called shoplist/get with dtoIn:", data);
      return mockCalls.shoplist.shoplistGet(data);

    } else {
      const response = await fetch(`${BASE_URL}/api/shoplist/get`, data);
      if (!response.ok) {
        throw new Error('Failed to fetch item detail');
      }
      return response.json();
    }
  },



  create: async (data) => {
    const response = await fetch(`${BASE_URL}/api/shoplist/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to create item');
    }

    return response.json();
  },

  list: async () => {
    const response = await fetch(`${BASE_URL}/api/shoplist/list`);

    if (!response.ok) {
      throw new Error('Failed to fetch item list');
    }

    return response.json();
  },

  delete: async (itemId) => {
    const response = await fetch(`${BASE_URL}/api/shoplist/delete/${itemId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete item');
    }

    return response.json();
  },
};

export default api;
