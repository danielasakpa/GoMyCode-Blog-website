import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ReadNext({ blogs, currentBlog }) {
  const [restBlogs, setRestBlogs] = useState([]);

  console.log("currentBlog.id", currentBlog);
  useEffect(() => {
    if (blogs.length > 0) {
      const rest = blogs.filter((blog) => blog.id !== currentBlog);
      console.log("rest", rest);
      setRestBlogs(rest);
    }
  }, [blogs, currentBlog]);

  console.log(restBlogs);

  return (
    <div className="flex items-start justify-between space-x-5">
      <div className="basis-1/2">
        <div className="flex items-center justify-center w-full">
          <img
            src={restBlogs[0]?.blogImage}
            alt="homeImg"
            className="w-[100%] h-[200px] bg-contain bg-center bg-no-repeat bg-top"
          />
        </div>
        <div className="pt-[20px]">
          <Link
            to={`/detail/${restBlogs[0]?.id}`}
            className="block font-Source text-[1.5em] font-[700] leading-[1.2] mb-3 hover:text-[#03A87C] hover:underline hover:underline-offset-4"
          >
            {restBlogs[0]?.topic}
          </Link>
          <p className="font-Source text-[16px] mb-4">
            {restBlogs[0]?.subTopic}
          </p>
          <p className="text-[#9B9B9B] text-[14px] mb-1">Favid Rick</p>
          <p className="text-[#9B9B9B] text-[14px]"> Dec 12 · 5 min read </p>
        </div>
      </div>
      <div className="flex flex-col space-y-3 basis-1/2">
        {restBlogs.slice(1, 4).map((blog) => (
          <div className="flex space-x-6" key={blog.id}>
            <img
              src={blog?.blogImage}
              alt="homeImg"
              className="w-[120px] h-[100px] bg-cover bg-no-repeat basis-1/3 bg-top"
            />
            <div className="basis-2/3">
              <Link
                to={`/detail/${blog?.id}`}
                className="block font-Source text-[16px] font-[700] leading-[19px] mb-3 hover:text-[#03A87C] hover:underline hover:underline-offset-4"
              >
                {blog?.topic}
              </Link>
              <p className="text-[#9B9B9B] text-[14px] mb-1">
                Jake Bittle in LOVE/HATE
              </p>
              <p className="text-[#9B9B9B] text-[14px]">
                {" "}
                Dec 12 · 5 min read{" "}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReadNext;
