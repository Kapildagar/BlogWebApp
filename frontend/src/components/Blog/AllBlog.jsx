// import React from 'react'

import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"



const AllBlog = () => {
   const navigate=useNavigate();
  const { user } = useSelector((state) => (state.login))
  const [data, setdata] = useState([]);
  const [editData, seteditData] = useState(null);

  console.log(user)

  useEffect(() => {
    (async () => {
      const res = await axios.get(`http://localhost:3000/api/v1/blog/getUserBlog/${user._id}`, {
        withCredentials: true
      })
      if (res.data.success) {
        setdata(res.data.data);
      }
      //  console.log(res);
    })()
  }, [])

  const handleClick = (i) => {
    console.log("working")
    const objecttoEdit = data.find((item) => item._id === i);
    console.log(objecttoEdit)
    seteditData(objecttoEdit);
  }
  const handleChange = (e) => {
    e.preventDefault()
    const{name,value,files}=e.target;
    console.log(files) 
    seteditData((prev) => ({
      ...prev, [name]: files?files[0]:value
    }))
  }
  const handleSave = async(e) => {
    e.preventDefault()
    const fd=new FormData();
    fd.append("tittle",editData.tittle);
    fd.append("des",editData.des);
    fd.append("blog_img",editData.img_url)
    const res=await axios.post(`http://localhost:3000/api/v1/blog/update_blog/${editData._id}`, fd,{
      withCredentials: true
    });
    console.log(res);
    if(res.data.success){
          navigate("/AllBlog")
    }
    console.log(editData);

    seteditData(null)
  }
  const handledelte = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/api/v1/blog/delete_blog/${id}`, {
        withCredentials: true
      });
      if(res.data.success){
      setdata(res.data.data);
      }
      console.log(res);

    }
    catch (err) {
      console.log(err);
    }

  }
  console.log(data)
  console.log(editData)
  return (
    <>
      <h1 className="text-[20px] w-fit mx-auto">Total Number of Blog Created :{data.length}</h1>
      {data?.map((b, index) => {
        return (
          <div key={index} className="border-[2px] border-red-600 my-[10px] sm:w-[600px] mx-auto p-[10px] ">
          <div className="flex justify-between">
            <div className="sm:flex sm:flex-col">
              <label className="text=[30px] font-bold">Tittle</label>
              {editData && editData._id == b._id ? <input type="text" value={editData.tittle} name="tittle" onChange={handleChange} className="border-[2px] rounded-md border-red-600" /> : <h1 className="">{b.tittle}</h1>}
            </div>
            <div className="sm:flex sm:flex-col">
              <label className="text=[30px] font-bold">Images</label>
              {editData && editData._id == b._id ?<input type="file" accept="Images/*" name="img_url" onChange={handleChange}/>:<img src={b.img_url} className="w-[120px] h-[120px] my-[2px] rounded-md" alt="" />}
            </div>
            </div>
            <label className="text=[20px] font-bold">Description</label>
            <div>
              {editData && editData._id == b._id ? <textarea type="text" value={editData.des} name="des" onChange={handleChange} cols={9} rows={9} className="border-[2px] sm:w-[570px]  border-red-500 rounded-md" ></textarea> : <p className="h-[200px] sm:w-[570px] overflow-y-auto border-[2px] rounded-md border-red-900">{b.des}</p>}
            </div>
            <div className="sm:flex sm:flex-row flex flex-col justify-center gap-2 my-[10px]">
              {editData && editData._id == b._id ? <button className="border-[2px] border-red-600 my-[2px] sm:w-[200px] sm:h-[40px] rounded-md" onClick={handleSave} >Save</button> :
                <button className="border-[2px] border-red-600 my-[2px] sm:w-[200px] sm:h-[40px] rounded-md" onClick={() => handleClick(b._id)} >Edit</button>}
              <button type="submit" className="border-[2px] border-red-600 my-[2px] sm:w-[200px] sm:h-[40px] rounded-md" onClick={() => handledelte(b._id)}>Delete</button>
            </div>
          </div >)
      })}

    </>
  )
}

export default AllBlog