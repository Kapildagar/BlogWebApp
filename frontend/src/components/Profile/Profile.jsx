
import { useSelector } from "react-redux"
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from "react-router-dom";

const Profile = () => {
  const { iserror, user, isloading } = useSelector((state) => (state.login))
  console.log(user)
  return (
    <>
      <div className="relative w-[300px] sm:w-[600px] lg:w-[1000px] mx-auto">
        <div className="sm:w-[400px] lg:w-[800px] h-[150px] rounded-md mx-auto mt-[20px]">
          <img className="h-full w-full rounded-md cursor-pointer" src={user?.coverImage} />
        </div>
        <div className="w-[150px] h-[150px] absolute left-[20px]  bottom-[-75px] sm:left-[150px] ">
          <img className="h-full w-full rounded-full cursor-pointer" src={user?.avatar} />
        </div>
      </div>
      <div className="mt-[90px] border-none w-[300px] border-black sm:w-[400px] lg:w-[600px] mx-auto">
        <div className=" text-3xl mx-auto w-fit">Profile</div>
        <h1 className="text-2xl border-2 pl-[10px] rounded-md border-black my-[1px] ">FullName</h1>
        <h1 className="text-[16px] border-2 pl-[10px] rounded-md border-black mt-[1px] mb-[10px]">{user?.fullName}</h1>
        <h1 className="text-2xl border-2 pl-[10px] rounded-md border-black my-[1px]">Email</h1>
        <h1 className="text-[16px] border-2 pl-[10px] rounded-md border-black  mt-[1px] mb-[10px]">{user?.email}</h1>
        <h1 className="text-2xl border-2 pl-[10px] rounded-md border-black my-[1px]">UserName</h1>
        <h1 className="text-[16px] border-2 pl-[10px] rounded-md border-black mt-[1px] mb-[10px]">{user?.username}</h1>
        <Link to="/updateprofile"> <h1 className="text-2xl border-2 pl-[10px] text-white text-center bg-blue-500 rounded-md border-black my-[2px] hover:text-blue-800 hover:bg-white hover:transition ease-in-out delay-150 ">Update Profile</h1></Link>

      </div>

    </>
  )
}

export default Profile