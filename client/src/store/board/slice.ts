import { Board } from '@/types';
import { BoardSliceState, Status } from '@/types/store';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
  'board/fetchBoardStatus',
  async (tag: string) => {
    const { data } = await axios.get<Board>('');

    return data;
  }
);

const initialState: BoardSliceState = {
  board: null,
  id: '',
  loadingStatus: Status.LOADING,
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setBoard(state, action: PayloadAction<Board>) {
      state.board = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchPizzas.pending, state => {
      state.loadingStatus = Status.LOADING;
      state.board = null;
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.board = action.payload;
      state.loadingStatus = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, state => {
      state.loadingStatus = Status.ERROR;
      state.board = null;
    });
  },
});

export default boardSlice.reducer;
export const { setBoard } = boardSlice.actions;
