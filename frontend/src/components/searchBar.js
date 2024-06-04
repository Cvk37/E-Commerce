import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import '../css/searchBar.css'

function SearchBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/products/${query}`); 
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search Products"
        value={query} 
        onChange={(e) => setQuery(e.target.value)}
        className='search-input'
      />
      <Button type='submit'>Search</Button>
    </form>
  );
}

export default SearchBar;