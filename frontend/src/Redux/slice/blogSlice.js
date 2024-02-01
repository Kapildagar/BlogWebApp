import { createSlice } from "@reduxjs/toolkit"



const initialState={
       blogData:[],
       isloading:true,
       isError:false   
}

const blogSlice=createSlice({
    name:"blog",
    initialState,
    reducers:{
    
   }
   

}
)


export default blogSlice.reducer;