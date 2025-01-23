"use client";

import React, { useEffect, useState } from "react";
import { useLogin } from "@/store/login";
import parse from "html-react-parser";
import Load from "@/components/BlogLoader/load";
import { useRouter } from "next/navigation";




const Page = () => {
  const { identity, login, login_Credential, set_User_info } = useLogin(
    (state) => ({
      identity: state.identity,
      login: state.login,
      login_Credential: state.login_Credential,
      set_User_info: state.set_User_info,
    })
  );
  const [blogs, setblogs] = useState([]);
  const router = useRouter();
  const checkLogin = () => {
    if (identity === "blogger") router.push("/Blog/publish");
    else {
      alert("please make a blogger account to publish your blog");
      set_User_info("");
      login_Credential("0");
      router.push("/Login");
    }
  };

  const [loader, setloader] = useState(true);

  useEffect(() => {
    
    
    const fetchData = async () => {
      const res = await fetch(`/api/blog`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'X-Custom-Header': process.env.NEXT_PUBLIC_FRONTEND,
        },
      });

      const data = await res.json();
      setblogs(data.blogs_Data);
      console.log(data.blogs_Data);
      setloader(false);
    };

    fetchData();
  }, []);
  const handleClick = (blogid) => {
    router.push(`/Blog/${blogid}`);
  };
  return (
    <>
      <div className="py-20 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
        {/* <button
          onClick={checkLogin}
          className="bg-black flex ml-auto mr-1 md:mr-3 rounded-md px-2 py-1 text-white hover:bg-white hover:text-black border border-black"
        >
          Publish Your Blog
        </button> */}
        <h1 className="text-2xl my-5 md:my-0 md:text-7xl text-center font-bold text-white md:pb-10">
          iLearnings Certified Blogs
        </h1>

        {loader ? (
          <Load />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3  gap-y-10 space-y-10 md:space-y-0 md:gap-x-4 mx-3 md:mx-4">
            {blogs.map((blog) => (
              <section className="border border-gray-200 rounded-2xl p-2 md:p-5 shadow-2xl" key={blog.blog_id}>
                <img
                  className="w-full object-fill "
                  src={blog.thumbnail_image}
                  alt="blog_thumbnail_image"
                />
                <div className="flex  justify-between font-semibold md:font-bold my-2 mx-1 text-xs md:text-sm text-cyan-500">
                  <h1>Author: {blog.author_name}</h1>{" "}
                  {/* Mapping author name */}
                  <h1>Date: {blog.date}</h1>{" "}
                  {/* Formatting and displaying date */}
                </div>
                <p className="text-xs md:text-sm px-2 font-semibold text-gray-300 ">
                  {parse(blog.content.substring(0, 100))}...
                  {/* Mapping and trimming content */}
                </p>

                <button
                  onClick={() => handleClick(blog._id)}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white ml-2 px-2 py-1 rounded-lg my-3"
                >
                  Read More
                </button>
              </section>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Page;
