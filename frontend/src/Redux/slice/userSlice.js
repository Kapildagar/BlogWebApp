import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import { userAPI } from './userAPI'
import axios from "axios"



// First, create the thunk
const createUser = createAsyncThunk(
  'users/createUser',
  async (data) => {
    console.log(data);
    const response = await axios.post(`http://localhost:3000/api/v1/user/register`, data);
    console.log(response);
    return response.data
  }
)

const loginuser = createAsyncThunk(
  'users/loginuser', async (data) => {
    try {
      console.log(data)
      const response = await axios.post("http://localhost:3000/api/v1/user/login", data,{
        withCredentials: true    // IMPORTANT!!!
      });
      console.log(response)
      console.log(response.data.success);
      return response.data
    }
    catch (error) {
      console.log(error)
        throw error
    }
  }

)

 const logoutuser=createAsyncThunk(
   "users/logoutuser",async()=>{
    try{
         console.log("working")
        const response=await axios.post("http://localhost:3000/api/v1/user/logout",{},{
          withCredentials: true,    // IMPORTANT!!!
        })
        console.log(response)
        return response.data
    }
    catch(error){
      console.log(error)
    }
   }
 )


 const updateProfile=createAsyncThunk("users/updateProfile",async(data)=>{
  try{
               console.log(data);
               const response=await axios.post("http://localhost:3000/api/v1/user/updateprofile",data,{
                withCredentials: true    // IMPORTANT!!!
              })
              return response.data
            }
            catch(err){
              console.log(err)
            }
 })

// interface UsersState {
//   entities: []
//   loading: 'idle' | 'pending' | 'succeeded' | 'failed'
// }

const initialState = {
  user: {},
  loading: 'idle',
  success: false,
  islogout: true,
  message: '',
  error: false
}

// Then, handle actions in your reducers:
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
    clearError:(state)=>{
         state.error=false;
        state.message=""
    },
    clearData:(state)=>{
      state.message=''
      state.user={}
      state.success=false
      state.islogout=true
    }
    
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(createUser.fulfilled, (state, action) => {
      // Add user to the state array
       console.log(action.payload)
      state.user = action.payload.data.user
      console.log(state.user)
      state.success = action.payload.success
      state.loading = false
      state.islogout=action.payload.success?false:true
      state.message = action.payload.message
      console.log(state.data)
    })
    builder.addCase(createUser.rejected, (state, action) => {
      state.success = action.payload.success
      state.error = action.payload.error
      state.message = action.payload.message
    })
    builder.addCase(loginuser.fulfilled, (state, action) => {
      console.log(action.payload.data)
      console.log(action.payload.success)
      state.user=action.payload?.data?.user
       state.success=action.payload?.success
       state.islogout=action.payload.success?false:true
     })
    builder.addCase(loginuser.rejected,(state,action)=>{
         console.log(action.error.message)
      console.log("working1")
         state.error=true,
         state.message=action.error.message
    })
    builder.addCase(logoutuser.fulfilled,(state,action)=>{
      console.log(action.payload)
      state.success=action.payload?.success
      state.islogout=action.payload.success?true:false
      state.message=action.payload?.message
    })
    builder.addCase(updateProfile.fulfilled,(state,action)=>{
      console.log(action)
      state.user=action.payload?.data?.user
      state.success=action.payload?.success
      state.islogout=action.payload.success?false:true
    })

  }

})

export const setdata = (state) => state.user
export const setloading = (state) => state.loading
export const setmessage = (state) => state.message
export const setsuccess = (state) => state.success
export const seterror = (state) => state.error
// export const setlogined=(state)=>state.islogined
export const {clearError,clearData}=usersSlice.actions
export { createUser, loginuser,logoutuser,updateProfile}
export default usersSlice.reducer