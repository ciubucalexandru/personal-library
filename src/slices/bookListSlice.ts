import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Book } from '../types';

interface BookListState {
  books: Book[];
}

const initialState: BookListState = {
  books: [],
};

export const bookListSlice = createSlice({
  name: 'bookList',
  initialState,
  reducers: {
    setBookList: (state, action: PayloadAction<Book[]>) => {
      state.books = action.payload;
    },
  },
});

export const { setBookList } = bookListSlice.actions;

export default bookListSlice.reducer;
