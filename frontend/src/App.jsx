
import { useEffect } from 'react';
import './App.css'
// import { Blog } from './components/Blog/Blog.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import FooterC from './components/Footer/Footer.jsx';
function App() {

  const path = useLocation().pathname.split('/')[1];
  const { user } = useSelector((state) => (state.login))
  console.log(user)
  const navigate = useNavigate();

  // console.log(path[1])
  // useEffect(()=>{
  //   if(!success && path!=="singup"){
  //     console.log(path)
  //     navigate("login")
  //   }
  // },[navigate,success])


  if (path === 'login' || path === 'signup') {


    return (
      <>
        <Outlet />
      </>
    )

  }

  else {
    return (
      <>
        <Navbar />
        {/* <Blog/> */}
        <Outlet />
        <FooterC/>
      </>
    )
  }

}

export default App
