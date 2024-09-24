import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import '../css/searchBar.css';

function SearchBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/products/${query}`);
  };

  return (
    (<form onSubmit={handleSubmit}>
      <TextField
        type="text"
        placeholder="Search Products"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className='search-input'
        variant="outlined"
        size="small"
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton type="submit" edge="end">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }
        }}
      />
    </form>)
  );
}

export default SearchBar;
