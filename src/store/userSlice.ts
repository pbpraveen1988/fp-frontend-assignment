import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types';

interface UserState {
  currentUser: User | null;
  searchHistory: User[];
}

const initialState: UserState = {
  currentUser: null,
  searchHistory: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
    },
    addToHistory: (state, action: PayloadAction<User>) => {
      if (!state.searchHistory.find(user => user.id === action.payload.id)) {
        state.searchHistory.push(action.payload);
      }
    },
    removeFromHistory: (state, action: PayloadAction<string>) => {
      state.searchHistory = state.searchHistory.filter(
        user => user.id !== action.payload
      );
    },
    clearHistory: (state) => {
      state.searchHistory = [];
    },
  },
});

export const { setCurrentUser, addToHistory, removeFromHistory, clearHistory } = userSlice.actions;
export default userSlice.reducer; 