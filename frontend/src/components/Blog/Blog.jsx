// import React from 'react'
import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const Blog = () => {

  const [data, setdata] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await axios("http://localhost:3000/api/v1/blog/all_blog");
      setdata(res.data.data)
      console.log(res)
    }
    fetchData()
  }, [])
  console.log(data)

  return (
    <>
      <div className="text-[40px] w-fit mx-auto font-sans font-bold text-gray-900">Blog</div>  
      <div className="w-fit mx-auto flex  gap-2">
        {data.map((d, index) => {
          return (<Link key={index}  className="cursor-pointer">
          <div className="p-2 border-[2px] border-none rounded-md bg-gray-700 ">
            <img className="h-[200px] rounded-md" src={d.img_url} />
            <h1 className="text-[20px] text-white my-1">{d?d.tittle:"Tittle"}</h1>
            <p className="text-white my-1">{d.des}</p>
            </div> 
          </Link>)
        })}
      </div>
    </>
  )

}
