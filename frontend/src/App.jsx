
import './App.css'
// import { Blog } from './components/Blog/Blog.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import { Outlet,useLocation } from 'react-router-dom'
function App() {
      
   const path=useLocation().pathname.split('/')[1];
 
  // console.log(path[1])
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
