import React from 'react';
import { useAppDispatch } from '../../store/hook';
import { AppBar, Box, Button, Toolbar } from '@mui/material';
import { setIsAddVisible } from '../../slices/addBookSlice';

const TopBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const addBook = () => {
    dispatch(setIsAddVisible(true));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar style={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" color="secondary" onClick={addBook}>
            Add Book
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default TopBar;
