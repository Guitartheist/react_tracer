import { createSlice } from '@reduxjs/toolkit';
import { UserData } from '../../components/displays/user/types';

interface UserState {
  userData: UserData,
};

const initialState:UserState = {
  userData: {
		userId: -1,
    username: '',
		userEmail: '',
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
