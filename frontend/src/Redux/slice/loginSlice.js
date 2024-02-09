import { createSlice } from "@reduxjs/toolkit"



const initialState={
    user:null,
    isloading:"false",
    iserror:"false"
}


const loginSlice=createSlice({
    name:"login",
    initialState,
    reducers:{
        setUser:(state,action)=>{
          console.log(state),
          console.log(action.payload);
          state.user=action.payload?.user;
        },
        setLoading:(state,action)=>{
             state.isloading=action.payload;
        },
        setError:(state,action)=>{
            state.iserror=action.payload;
        }
    }
}
)

export const {setUser,setLoading,setError}=loginSlice.actions;
export default loginSlice.reducer;
