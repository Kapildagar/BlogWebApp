import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUser, setsuccess } from '../../Redux/slice/userSlice';
import { setdata,seterror } from '../../Redux/slice/userSlice';
import {useNavigate} from "react-router-dom"
const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    fullName:'',
    avatar: null,
    coverImage:null
  });
  const navigate=useNavigate()
  const dispatch=useDispatch();
  const data=useSelector(setdata)
   console.log(data);
   const success=useSelector(setsuccess)
   const error=useSelector(seterror)
   console.log(success);

  useEffect(()=>{
    if(error){
       console.log(error);
    }
     if(success){
      navigate("/");
     }
  },
  [success,navigate,error]
  )
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to a server
    const fd=new FormData();
    fd.append('username',formData.username);
    fd.append('email',formData.email)
    fd.append('avatar',formData.avatar)
    fd.append('coverImage',formData.coverImage)
    fd.append('password',formData.password)
    fd.append('fullName',formData.fullName)
    dispatch(createUser(fd))
    // console.log('Form Data:', fd);
  };

  return (
    <>
    <div className='h-[100vh] dark:bg-gray-900  p-[30px]'>
    <div className='w-fit mx-auto'>
    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
          signup
      </a>
      </div>
    <form className="max-w-md min-w-[300px] mx-auto mt-8 p-4 bg-white rounded shadow-md dark:bg-gray-800 dark:border-gray-700 " onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="username" className="block text-white text-sm font-bold mb-2">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          className="w-full p-2 border border-gray-300 rounded"
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-white text-sm font-bold mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full p-2 border border-gray-300 rounded"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-white text-sm font-bold mb-2">
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          className="w-full p-2 border border-gray-300 rounded"
          value={formData.fullName}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-white text-sm font-bold mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="w-full p-2 border border-gray-300 rounded"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="avatar" className="block text-white text-sm font-bold mb-2">
          Avatar
        </label>
        <input type="file" id="avatar" name="avatar" accept="image/*" onChange={handleChange} />
      </div>
      <div className="mb-4">
        <label htmlFor="coverImage" className="block text-white text-sm font-bold mb-2">
          CoverImage
        </label>
        <input type="file" id="coverImage" name="coverImage" accept="image/*" onChange={handleChange} />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800 w-full"
      >
        Sign Up
      </button>
    </form>
    </div>
    </>
  );
};

export default SignUp;
