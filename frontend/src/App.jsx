
import { useEffect } from 'react';
import './App.css'
// import { Blog } from './components/Blog/Blog.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import { Outlet,useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
function App() {
      
   const path=useLocation().pathname.split('/')[1];
   const {user,success}=useSelector((state)=>(state.user))
   console.log(user)
   const navigate=useNavigate();
 
  // console.log(path[1])
  // useEffect(()=>{
  //   if(!success && path!=="singup"){
  //     console.log(path)
  //     navigate("login")
  //   }
  // },[navigate,success])
  
  
  if(path==='login'|| path==='signup'){
    return (
      <>
        <Outlet />
      </>
    )
  }
  else{
  return (
    <>
    <Navbar />
    {/* <Blog/> */}
    <Outlet/>
    </>
  )
  }

}

export default App
