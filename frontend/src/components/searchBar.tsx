import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import '../css/searchBar.css';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (query.trim()) {
      navigate(`/products/${query}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        type="text"
        placeholder="Search Products"
        value={query}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
        className="search-input"
        variant="outlined"
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton type="submit" edge="end">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
};

export default SearchBar;
