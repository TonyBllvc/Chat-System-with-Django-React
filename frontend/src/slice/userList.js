
// userList.js
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    userList: null,
    loadin: true
};

const userList = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // user info
        // data
        setUserList: (state, action) => {
            state.userList = action.payload;
        },
        setLoad: (state, action) => {
            state.loadin = action.payload;
        },
        removeUserList: (state, action) => {
            state.userList = null;
            // state.userDetails = null;
            // state.loadin = false;


            // removeUserToken()
            // When logging out, remove both the cookie and localStorage
            // localStorage.removeItem('userList');
        },
    },
});
export const { setUserList, setLoad, removeUserList } = userList.actions;

export default userList.reducer;
