import { BoardResponse } from '@/types/api';
import { BoardSliceState, Status } from '@/types/store';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBoardByTag = createAsyncThunk(
  'board/fetchBoardStatus',
  async (tag: string) => {
    const { data } = await axios.get<BoardResponse>(
      process.env.API_URL + `/boards/${tag}`
    );

    return data;
  }
);

const initialState: BoardSliceState = {
  board: null,
  loadingStatus: Status.LOADING,
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setBoard(state, action: PayloadAction<BoardResponse>) {
      state.board = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchBoardByTag.pending, state => {
      state.loadingStatus = Status.LOADING;
      state.board = null;
    });
    builder.addCase(fetchBoardByTag.fulfilled, (state, action) => {
      state.board = action.payload;
      state.loadingStatus = Status.SUCCESS;
    });
    builder.addCase(fetchBoardByTag.rejected, state => {
      state.loadingStatus = Status.ERROR;
      state.board = null;
    });
  },
});

export default boardSlice.reducer;
export const { setBoard } = boardSlice.actions;
