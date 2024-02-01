// import { NavLink } from "react-router-dom"
import { useEffect, useState } from "react";
import { clearData, logoutuser } from "../../Redux/slice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaSignInAlt, FaUserPlus, FaSignOutAlt } from 'react-icons/fa'
import { Link } from "react-router-dom";
// import presistor from '../Redux/store/store.js'



const Navbar = () => {
   
    const {success,user,islogout}=useSelector((state)=>state.user)
    console.log(user)
    console.log(success)
     console.log(islogout)
    // console.log(user.avatar)
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const dispatch=useDispatch();
    useEffect(()=>{
            if(islogout && success){
                alert("you have logged out suceesfully")
                dispatch(clearData())
            }
    },[islogout,success,dispatch])
    
    const handlelogout=()=>{
           dispatch(logoutuser());
    }

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };
    const url = 'https://yt3.googleusercontent.com/ytc/AIf8zZS6XDo-M7dlTyolU_yBAp-cmqn0EfZ8AGkKa9yItg=s900-c-k-c0x00ffffff-no-rj'
    return (
        <>
            <nav className="bg-gray-800 p-4">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="flex items-center">
                        <a href="/" className="text-white text-lg font-bold">
                            Your Logo
                        </a>

                    </div>
                    <div className={`hidden md:flex space-x-4 ml-4 ${isMobileMenuOpen ? 'hidden' : 'flex'}`}>
                        <a href="#" className="text-white">
                            Home
                        </a>
                        <a href="#" className="text-white">
                            About
                        </a>
                        <a href="#" className="text-white">
                            Services
                        </a>
                        <a href="#" className="text-white">
                            Contact
                        </a>
                    </div>

                    <div className="flex items-center gap-2">
                        {success ?
                            <div className={`container mx-auto flex  items-center justify-between gap-2`}>
                                <button
                                     onClick={handlelogout}
                                    className="text-white hidden md:flex items-center space-x-2 transition duration-300 ease-in-out transform hover:scale-110"
                                >
                                    <span>Logout</span>
                                    <FaSignOutAlt />
                                </button>
                                 <Link to='/profile'>
                                <img
                                    src={user ? user.avatar : url} // Replace with the path to your profile picture
                                    alt="Profile"
                                    className="w-8 h-8 rounded-full mr-2 cursor-pointer"
                                // onClick={toggleMobileMenu}
                                /></Link>
                                 </div> :

                            <div className={`container mx-auto hidden md:flex  items-center justify-between`}>
                                <Link
                                    to="/login"
                                    className={`text-white flex items-center space-x-2 mr-4 transition duration-300 ease-in-out transform hover:scale-110`}
                                >
                                    <span>Login</span>
                                    <FaSignInAlt />
                                </Link>
                                <Link
                                    to="/signup"
                                    className="text-white flex items-center space-x-2 transition duration-300 ease-in-out transform hover:scale-110"
                                >
                                    <span>Sign Up</span>
                                    <FaUserPlus />
                                </Link>
                            </div>
                        }
                        <button
                            className="md:hidden text-white focus:outline-none"
                            onClick={toggleMobileMenu}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="h-6 w-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16m-7 6h7"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile menu (hidden on larger screens) */}
                <div className={`md:hidden bg-gray-800 p-4 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
                    <a href="#" className="block text-white">
                        Home
                    </a>
                    <a href="#" className="block text-white">
                        About
                    </a>
                    <a href="#" className="block text-white">
                        Services
                    </a>
                    <a href="#" className="block text-white">
                        Contact
                    </a>
                    <a href="#" className={`${success ? "hidden" : "flex"} items-center gap-2  text-white`}>
                        <span>Login</span>
                        <FaSignInAlt />

                    </a>
                    <a href="#" className={`${success ? "hidden" : "flex"} items-center gap-2  text-white`}>
                        <span>Sign Up</span>
                        <FaUserPlus />
                    </a>
                    <a href="#"  className={`${success ? "flex" : "hidden"} items-center gap-2  text-white`}  >
                        <span>Logout</span>
                        <FaSignOutAlt />
                    </a>
                </div>
            </nav>
        </>
    )
}

export default Navbar