import axios from "axios";
import { useState } from "react"
import backendRoutes from "../../../utilis/routes";

export const CreateBlog = () => {
  const [data,setdata]=useState({
    tittle:'',
    des:'',
    file:'',

})

const handleChanges=(e)=>{
   e.preventDefault();
     const {name,value,files}=e.target;
     console.log(name,value,files);
     setdata((prev)=>({
        ...prev,
        [name]:files?files[0]:value  
     }))
}

const handleSubmit=async(e)=>{
     e.preventDefault();
     const fd=new FormData();
     fd.append("tittle",data.tittle)
     fd.append("blog_img",data.file)
     fd.append("des",data.des)
     console.log(fd)
      const res=await axios.post(`${backendRoutes}/blog/create_blog`,fd,{
        withCredentials: true    // IMPORTANT!!!
      });
      console.log(res);

}
  console.log(data)
  return (

    
    <>
      <div className="h-screen bg-gray-100">
        <h1 className="text-[50px] font-bold text-center text-black">CREATE BLOG</h1>
        <div className="w-min-[300px] border-none border-[2px]  mt-[20px] md:mx-auto md:w-fit">
          <form className="flex flex-col gap-2 p-[10px] bg-white rounded shadow-md dark:bg-gray-800 dark:border-gray-700 " onSubmit={handleSubmit}>
            <label htmlFor="tittle" className="text-[30px] font-bold text-black ">Tittle</label>
            <input type="text" className="border-[2px] border-gray-400 w-[250px] rounded-lg p-1 " placeholder="Enter Tittle" name="tittle" value={data.tittle} onChange={handleChanges} />
            <label htmlFor="tittle" className="text-[30px] font-bold text-black">Images</label>
            <input type="file" className="cursor-pointer border-[2px] border-gray-400 w-[300px] rounded-lg  block"   accept="image/*" name="file"  onChange={handleChanges}/>
            <label htmlFor="tittle" className="text-[30px] font-bold text-black">Description</label>
            <textarea type="text" rows="10" className="border-[2px] border-gray-400 w-[300px] md:w-[800px]   rounded-lg pt-1 pl-2" name="des" placeholder="Please enter the text" value={data.des} onChange={handleChanges}></textarea>
            <button type="submit" className="border-[1px] bg-blue-700 rounded-md h-[40px] w-[200px] text-[20px] font-bold text-white" >Create Blog</button>
          </form>
        </div>
      </div>
    </>

  )

}
