// import React from 'react'
import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
'use client';
import { IoIosCreate } from "react-icons/io";
import { FaUser,FaUserEdit,FaBlogger } from "react-icons/fa";
import { Carousel,Card  } from 'flowbite-react';
import { Sidebar } from 'flowbite-react';
import backendRoutes from "../../../utilis/routes";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser } from 'react-icons/hi';
export const Blog = () => {

  const [data, setdata] = useState([]);
  // const [sidebar, setsidebar] = useState(false);
  // const [loading,setloading]=useState(true);
  useEffect(() => {
    async function fetchData() {
      const res = await axios(`${backendRoutes}/blog/all_blog`);
      setdata(res.data.data)
      console.log(res)
    }
    fetchData()
  }, [])
  console.log(data)
  // console.log(sidebar)

  return (
    <>



      <div className="text-[40px] w-fit mx-auto font-sans font-bold text-gray-900">Blog</div>

      


<div className="sm:hidden flex gap-2 my-2 w-fit mx-auto">
    <Card href="/updateprofile" className="w-fit flex flex-col items-center">
    <FaUserEdit className="text-[25px]"/>
    </Card>
    <Card href="/AllBlog" className="w-fit flex flex-col items-center">
    <FaBlogger className="text-[25px]" />
    </Card>
    <Card href="/CreateBlog" className="w-fit flex flex-col items-center">
    <IoIosCreate  className="text-[25px]" />
    </Card>
    </div>

   
  

      
      <div className="h-56 sm:h-72 mb-[20px]  ">
        <Carousel pauseOnHover>
          <img src="https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=400" className="object-fill" alt="..." />
          <img src="https://img.freepik.com/free-photo/toy-bricks-table-with-word-blog_144627-47465.jpg" className="object-fill " alt="..." />
          <img src="https://flowbite.com/docs/images/carousel/carousel-3.svg" alt="..." />
          <img src="https://flowbite.com/docs/images/carousel/carousel-4.svg" alt="..." />
          <img src="https://flowbite.com/docs/images/carousel/carousel-5.svg" alt="..." />
        </Carousel>
      </div>
      <div className="flex-col sm:flex sm:flex-row gap-4 px-2">
        <div>
          <Sidebar aria-label="Sidebar with multi-level dropdown example" className="hidden sm:block border-[2px] border-black rounded-md sm:w-[300px]">
            <Sidebar.Items>
              <Sidebar.ItemGroup>
                <Sidebar.Item href="/Createblog" icon={HiChartPie}>
                  Create Blog
                </Sidebar.Item>
                <Sidebar.Collapse icon={HiShoppingBag} label="Profile">
                  <Sidebar.Item href="/updateprofile">Upadte Details</Sidebar.Item>
                  <Sidebar.Item href="#">Upadte Images</Sidebar.Item>
                  {/* <Sidebar.Item href="#">Refunds</Sidebar.Item>
                  <Sidebar.Item href="#">Shipping</Sidebar.Item> */}
                </Sidebar.Collapse>
                <Sidebar.Item href="/AllBlog" icon={HiInbox}>
                  All Blog
                </Sidebar.Item>
                <Sidebar.Item href="#" icon={HiUser}>
                  Delete Blog
                </Sidebar.Item>
                <Sidebar.Item href="#" icon={HiShoppingBag}>
                  Services
                </Sidebar.Item>
                <Sidebar.Item href="#" icon={HiArrowSmRight}>
                  About
                </Sidebar.Item>
                <Sidebar.Item href="#" icon={HiTable}>
                  Contact
                </Sidebar.Item>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </Sidebar>
        </div>
        <div className="sm:flex sm:flex-col sm:h-[500px] sm:overflow-y-auto ">
        <div className="flex flex-col">
              <h1 className="font-bold w-fit my-[2px] text-[25px]">Latest Blog</h1>
          <div className="w-fit mx-auto flex gap-2">  
              {data.map((d, index) => {
                return (<Link key={index} to={`/getBlog/${d._id}`} className="cursor-pointer">
                  <div className="p-2 border-[2px] border-none rounded-md bg-gray-700 ">
                    <img className="h-[200px] rounded-md" src={d.img_url} />
                    <h1 className="text-[20px] text-white my-1">{d ? d.tittle : "Tittle"}</h1>
                    
                  </div>
                </Link>)
              })}
            </div>
          </div>
          {/* <p className="my-[20px]">The paper draws an analogy from history, harking back to Abraham Wald's assessment of the vulnerability of airplanes to enemy fire during World War II. Wald's insight was to consider the planes that didn't return, not just the ones that did. Similarly, the paper questions the conventional approach of using case studies of successful e-commerce ventures to gauge its impact on inclusive development. These success stories can lead to a survivorship bias, as they only showcase those who passed a selection process, disregarding the experiences of those who attempted and failed. A comprehensive assessment of e-commerce's impact must include the stories of entrepreneurs, farmers, and traditional brick-and-mortar store owners who faced difficulties, as their experiences are integral for policymaking.</p>
          <p className="my-[20px]">The paper draws an analogy from history, harking back to Abraham Wald's assessment of the vulnerability of airplanes to enemy fire during World War II. Wald's insight was to consider the planes that didn't return, not just the ones that did. Similarly, the paper questions the conventional approach of using case studies of successful e-commerce ventures to gauge its impact on inclusive development. These success stories can lead to a survivorship bias, as they only showcase those who passed a selection process, disregarding the experiences of those who attempted and failed. A comprehensive assessment of e-commerce's impact must include the stories of entrepreneurs, farmers, and traditional brick-and-mortar store owners who faced difficulties, as their experiences are integral for policymaking.</p>
          <p className="my-[20px]">The paper draws an analogy from history, harking back to Abraham Wald's assessment of the vulnerability of airplanes to enemy fire during World War II. Wald's insight was to consider the planes that didn't return, not just the ones that did. Similarly, the paper questions the conventional approach of using case studies of successful e-commerce ventures to gauge its impact on inclusive development. These success stories can lead to a survivorship bias, as they only showcase those who passed a selection process, disregarding the experiences of those who attempted and failed. A comprehensive assessment of e-commerce's impact must include the stories of entrepreneurs, farmers, and traditional brick-and-mortar store owners who faced difficulties, as their experiences are integral for policymaking.</p>
          <p className="my-[20px]">The paper draws an analogy from history, harking back to Abraham Wald's assessment of the vulnerability of airplanes to enemy fire during World War II. Wald's insight was to consider the planes that didn't return, not just the ones that did. Similarly, the paper questions the conventional approach of using case studies of successful e-commerce ventures to gauge its impact on inclusive development. These success stories can lead to a survivorship bias, as they only showcase those who passed a selection process, disregarding the experiences of those who attempted and failed. A comprehensive assessment of e-commerce's impact must include the stories of entrepreneurs, farmers, and traditional brick-and-mortar store owners who faced difficulties, as their experiences are integral for policymaking.</p> */}
        </div>
      </div>
    </>
  )

}
