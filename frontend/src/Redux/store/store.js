// import { configureStore } from '@reduxjs/toolkit'

 import userReducer from "../slice/userSlice.js"
 import blogReducer from '../slice/blogSlice.js'
 import {
  persistStore,
  persistReducer,
  // FLUSH,
  // REHYDRATE,
  // PAUSE,
  // PERSIST,
  // PURGE,
  // REGISTER,
} from 'redux-persist';
// const store = configureStore({
//     reducer:
//     { user: userReducer }
// })

// export default store;

import { combineReducers, configureStore } from '@reduxjs/toolkit';

import storage from 'redux-persist/lib/storage'; // default: localStorage for web

// import rootReducer from './reducers'; // Import your root reducer


const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};
const rootReducer=combineReducers({
  user:userReducer,
  blog:blogReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
   middleware: ( getDefaultMiddleware ) =>
   getDefaultMiddleware({
   serializableCheck: false,
  }),
  // ...other middleware or enhancers
});

const persistor = persistStore(store);

export { store,persistor };