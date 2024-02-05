import {  useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import backendRoutes from "../../../utilis/routes";
import { useNavigate } from "react-router-dom";
import { setError, setLoading, setUser } from "../../Redux/slice/loginSlice";
import axios from "axios"



const UpdateProfilePage = () => {


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isloading} = useSelector((state) => (state.login))
    // console.log(response)
    const [formData, setformData] = useState({
        fullName: user?.fullName,
        email: user?.email,
        userName: user?.username
    })


    //  useEffect(()=>{
    //          if(success){
    //                navigate("/profile")  
    //          }
    //  },[success,navigate])
    const handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target;
        setformData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            // console.log(formData)
            dispatch(setLoading(true));
            const res = await axios.post(`${backendRoutes}/user/updateprofile`, formData, {
                withCredentials: true    // IMPORTANT!!!
            })
            if (res.data.success) {
                setLoading(false)
                setError(false)
                dispatch(setUser(res.data.data));
                navigate('/profile');
            }
            console.log(res)
            // dispatch(updateProfile(formData));
        }
        catch (err) {
            dispatch(setLoading(false));
            dispatch(setError(true));
            console.log(err)
            dispatch(setError(false))
        }

    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                    Update Profile
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl dark:text-white">
                            Personal Details
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your FullName</label>
                                <input type="text" id="email" name="fullName" value={formData.fullName} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="fullName" required="" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
                                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                            </div>
                            <div>
                                <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your UserName</label>
                                <input type="text" id="email" name="userName" value={formData.userName} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="userName" required="" />
                            </div>


                            <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{isloading?"Loading...":"Upadte Details"}</button>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default UpdateProfilePage