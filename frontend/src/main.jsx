import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from './components/Login/Login.jsx';
import SignUP from './components/SignUp/SignUP.jsx';
import { Provider } from 'react-redux';
// import store from "./Redux/store/store.js"
import Profile from './components/Profile/Profile.jsx';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './Redux/store/store.js';
import UpdateProfilePage from './components/Profile/UpdateProfilePage.jsx';
import { CreateBlog } from './components/Blog/CreateBlog.jsx';
import { Blog } from './components/Blog/Blog.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>} >
      {/* <Route path='' element={<App/>}/> */}
      <Route path='' element={<Blog/>}/>
     <Route path='login' element={<Login/>}/>
     <Route path='signup' element={<SignUP/>}/>
     <Route path='profile' element={<Profile/>}/>
     <Route path='updateprofile' element={<UpdateProfilePage/>}/>
     <Route path='CreateBlog' element={<CreateBlog/>}/>
    </Route>
  )
);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
     <RouterProvider router={router} /> 
    </PersistGate>
       </Provider>
  </React.StrictMode>,
)
