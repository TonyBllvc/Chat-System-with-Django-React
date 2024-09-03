
// authSlice.js
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    userInfo: null,
    userList: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // user info
        setDetails: (state, action) => {
            state.userList = action.payload;
        },
        // data
        setInfo: (state, action) => {
            state.userInfo = action.payload;
        },
        // setLoad: (state, action) => {
        //     state.loadin = action.payload;
        // },
        // setHandleRoute: (state, action) => {
        //   state.stateFilled = action.payload;
        // },
        logoutUser: (state, action) => {
            state.userInfo = null;
            state.userDetails = null;
            // state.loadin = false;


            // removeUserToken()
            // When logging out, remove both the cookie and localStorage
            // localStorage.removeItem('userInfo');
        },
    },
});
export const { setDetails, setInfo, logoutUser } = authSlice.actions;

export default authSlice.reducer;


// {
//     "status": "success",
//     "data": {
//        "email": "george.ekwemadu@gmail.com",
//        "full_name": "Blvc George",
//        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIxMDYyMjU5LCJpYXQiOjE3MjEwNTkyNTksImp0aSI6ImVjNTcxZGMxMDBkNDRmYTViNDU3M2RlZDQxYmE3MTM1IiwidXNlcl9pZCI6ImFjMTVhYzVmLTlmZGQtNGY0Ni1iODM4LTVkYmZlZGU1YTM4MCJ9.mos9QoJ-Mf55gUYYgSzufKMnLgUnSXPtCusiA1DS2cY",
//        "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMTE0NTY1OSwiaWF0IjoxNzIxMDU5MjU5LCJqdGkiOiI0MzUyNTc0NjY5N2I0OGI4ODhkNWM1ODFmMzJmZDllMSIsInVzZXJfaWQiOiJhYzE1YWM1Zi05ZmRkLTRmNDYtYjgzOC01ZGJmZWRlNWEzODAifQ.pcMkUWqgxkwij0Yj9GpDmSo6yl7V_vCxvWd_9qWUOEQ"
//     },
//     "user": {
//        "user_name": "Blvc George",
//        "first": "George",
//        "last": "Blvc",
//        "email": "george.ekwemadu@gmail.com",
//        "gender": "Male",
//        "staff": true,
//        "active": true,
//        "vendor": "Default",
//        "last_updated": "2024-07-10T10:14:48.936649Z",
//        "logged": "2024-07-10T10:14:48.936649Z",
//        "ban": false,
//        "role": "admin"
//     },
//     "message": "User account is logged successfully"
// }