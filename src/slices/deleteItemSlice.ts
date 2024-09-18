import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface DeleteItemSlice {
  id: number | null;
  isVisible: boolean;
  isLoading: boolean;
}

const initialState: DeleteItemSlice = {
  id: null,
  isVisible: false,
  isLoading: false,
};

export const deleteItemSlice = createSlice({
  name: 'deleteItem',
  initialState,
  reducers: {
    setDeleteId: (state, action: PayloadAction<number | null>) => {
      state.id = action.payload;
    },
    setIsDeleteLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIsDeleteVisible: (state, action: PayloadAction<boolean>) => {
      state.isVisible = action.payload;
    },
  },
});

export const { setDeleteId, setIsDeleteLoading, setIsDeleteVisible } = deleteItemSlice.actions;

export default deleteItemSlice.reducer;
