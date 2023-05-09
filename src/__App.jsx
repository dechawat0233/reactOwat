import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('/api/items');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'description') {
      setDescription(value);
    }
  };

  const handleAddItem = async () => {
    try {
      const response = await axios.post('/api/items', { name, description });
      const newItem = { id: response.data.id, name, description };
      setItems([...items, newItem]);
      setName('');
      setDescription('');
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleUpdateItem = async (id, newName, newDescription) => {
    try {
      await axios.put(`/api/items/${id}`, { name: newName, description: newDescription });
      const updatedItems = items.map((item) => {
        if (item.id === id) {
          return { ...item, name: newName, description: newDescription };
        }
        return item;
      });
      setItems(updatedItems);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`/api/items/${id}`);
      const updatedItems = items.filter((item) => item.id !== id);
      setItems(updatedItems);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div>
      <h1>CRUD App with MySQL and React</h1>
      <h2>Add Item</h2>
      <input
        type="text"
        name="name"
        value={name}
        placeholder="Name"
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="description"
        value={description}
        placeholder="Description"
        onChange={handleInputChange}
      />
      <button onClick={handleAddItem}>Add Item</button>
      <h2>Items</h2>
      {items.map((item) => (
        <div key={item.id}>
          <input
            type="text"
            value={item.name}
            onChange={(e) => handleUpdateItem(item.id, e.target.value, item.description)}
          />
          <input
            type="text"
            value={item.description}
            onChange={(e) => handleUpdateItem(item.id, item.name, e.target.value)}
          />
          <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default App;
