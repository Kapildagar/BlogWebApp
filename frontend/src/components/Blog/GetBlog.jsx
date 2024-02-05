import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import backendRoutes from "../../../utilis/routes";


const GetBlog = () => {
  const { id } = useParams();
  const [data, setData] = useState("");
  console.log(id);
  useEffect(() => {
    (async () => {
      const res = await axios.get(`${backendRoutes}/blog/getBlog/${id}`)
      if (res.data.success) {
        setData(res.data.data);
      }
      // console.log(res);
    })()
  }, [])
  console.log(data);
  return (
    <div>
      <h1 className="sm:text-[40px] w-fit mx-auto my-[5px] font-bold">{data.tittle}</h1>
      <img src={data.img_url} className="sm:w-[400px] sm:h-[400px] mx-auto my-[10px] rounded-md" />
      <p className="md:w-[1000px]  sm:[800px] text-balance mx-auto">{data.des}</p>


    </div>
  )
}

export default GetBlog