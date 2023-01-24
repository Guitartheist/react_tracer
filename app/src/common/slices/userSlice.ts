import { createSlice } from '@reduxjs/toolkit';
import { UserData } from '../../components/displays/user/types';

interface UserState {
  userData: UserData,
};

const initialState:UserState = {
  userData: {
    id: -1,
    username: '',
    email: '',
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    storeUserData(state, action) {
      return{
        ...state,
        userData: action.payload
      }
    }
  }
});

export const {
  storeUserData,
} = userSlice.actions;

export default userSlice.reducer;
