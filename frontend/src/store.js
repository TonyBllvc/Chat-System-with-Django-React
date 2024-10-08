// store.js
import { configureStore } from '@reduxjs/toolkit';
import userListReducer from './slice/userList'
// import { apiSlice } from './slice/apiSlice';

const store = configureStore({
  reducer: {
    // [apiSlice.reducerPath]: apiSlice.reducer,
    userListStatus: userListReducer,
    // product: productReducer,
    // // singleProduct: singleProductReducer,
    // brand: brandReducer,
    // // singleBrand: singleBrandReducer,
    // category: categoryReducer,
    // blog: blogReducer,
    // navigate: navControllerReducer,
  },
  //   middleware: (getDefaultMiddleware) =>
  //     getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;

// export const dispatchThunk = async (thunk) => {
//   const store = useSelector((state) => state);
//   if (store.getState() === undefined) {
//     // The Redux store is not initialized.
//     return;
//   }

//   // The Redux store is initialized.
//   store.dispatch(thunk());
// };