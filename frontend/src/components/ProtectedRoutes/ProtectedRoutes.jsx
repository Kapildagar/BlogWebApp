import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";


const ProtectedRoutes = ({children}) => {

     const {user}=useSelector((state)=>(state.login))
     console.log(user);
     

  return user?children:<Navigate to="/login"/>;
}

export default ProtectedRoutes