// app/Blog/[id]/page.js
"use client";
import React, { useState, useEffect } from "react";
import parse from "html-react-parser";
import Loading from "@/components/BlogLoader/load.js";
import { useParams } from "next/navigation";
import { Montserrat, Quicksand, Sanchez } from "next/font/google";
const font = Sanchez({
  weight: "400",
  subsets: ["latin"],
});
const BlogDetails = () => {
  const { id } = useParams(); // Use destructuring to access the 'id' parameter
  const [blog, setBlog] = useState(null); // State to store the specific blog
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    console.log("running id ", id);
    const fetchData = async () => {
      const res = await fetch(`/api/blog`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'X-Custom-Header': process.env.NEXT_PUBLIC_FRONTEND,
        },
      });

      if (!res.ok) {
        console.error("Failed to fetch blogs.");
        setLoader(false);
        return;
      }

      const data = await res.json();
      console.log(data.blogs_Data);

      // Find the blog with the matching blog_id
      const filteredBlog = data.blogs_Data.find((blog) => blog._id === id);
      setBlog(filteredBlog); // Set the specific blog
      setLoader(false); // Turn off the loader
    };

    fetchData();
  }, [id]);

  return (
    <>
      {loader ? (
        <Loading />
      ) : blog ? ( // Check if the blog is found
        <div className="pt-20 py-5 px-2 md:px-[10%] bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 w-[100%] md:w-[100%] mx-auto">
          <img
            className="w-full object-fill"
            src={blog.thumbnail_image}
            alt="blog_image"
          />
          <div className="flex font-extralight text-cyan-500 justify-between mx-3 my-2">
            <h1 className="text-xs md:text-sm">Author : {blog.author_name}</h1>
            <h1 className="text-xs md:text-sm">Date : {blog.date}</h1>
          </div>
          

          <div className={` bg-slate-800 px-1 py-5 rounded-lg text-gray-300 border border-gray-700 ${font.className}`}>{parse(blog.content)}</div>
        </div>
      ) : (
        <p>Blog not found.</p> // Handle case when blog is not found
      )}
    </>
  );
};

export default BlogDetails;
