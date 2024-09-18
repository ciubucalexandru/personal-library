import { configureStore } from '@reduxjs/toolkit';
import bookListReducer from '../slices/bookListSlice';
import deleteItemReducer from '../slices/deleteItemSlice';
import addBookReducer from '../slices/addBookSlice';

export const store = configureStore({
  reducer: {
    bookList: bookListReducer,
    deleteItem: deleteItemReducer,
    addBook: addBookReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
