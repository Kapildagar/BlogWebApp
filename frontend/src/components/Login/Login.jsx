import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
// import { clearError, loginuser } from "../../Redux/slice/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setError, setLoading, setUser } from "../../Redux/slice/loginSlice";
import backendRoutes from "../../../utilis/routes";
const Login = () => {
    const use = useSelector(state => state.login);
    console.log(use)
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { user, isloading,iserror } = useSelector((state) => state.login);
    // const error=useSelector(seterror)
    // const message=useSelector(setmessage);
    // const success=useSelector((state)=>state.user.success)
    console.log(isloading)
    console.log(user)
    console.log(iserror)

    // useEffect(() => {
        // if (error) {
        //     alert(message)
        //     // dispatch(clearError())
        // }
        // if (success) {
        //     navigate("/")
        // }
        //  setemail('')
        //  setpassword('')
    // }, [navigate, error, message, dispatch, success])

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            dispatch(setLoading(true));
            const res = await axios.post(`${backendRoutes}/user/login`, { email, password }, {
                withCredentials: true    // IMPORTANT!!!
            })
            console.log(res);
            if(res.data.success){
               dispatch(setLoading(false))
               dispatch(setError(false));
               dispatch(setUser(res.data.data));
               navigate('/')
            }         
        }
        catch (err) {
            dispatch(setLoading(false))
            dispatch(setError(true));
            console.log(err);
            dispatch(setError(false))
        }        // dispatch(loginuser({email,password}));
    }


    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                    Login
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input type="email" value={email} id="email" onChange={(e) => { setemail(e.target.value) }} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" value={password} id="password" onChange={(e) => { setpassword(e.target.value) }} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required="" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                    </div>
                                </div>
                                <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Forgot password?</a>
                            </div>
                            <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{isloading?"Loading...":"Sign up"}</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <a href="/signup" className="font-medium text-blue-600 hover:underline dark:text-blue-500">SignUp</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login