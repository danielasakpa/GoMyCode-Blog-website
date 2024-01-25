import React, { useState, useEffect } from "react";
import BlogCard from "./BlogCard";

function BlogCards({ blogs, currentBlog, loadingUserBlog }) {
  const [restBlogs, setRestBlogs] = useState([]);

  useEffect(() => {
    if (blogs?.length > 0 && currentBlog) {
      const rest = blogs?.filter((blog) => blog.id !== currentBlog);
      setRestBlogs(rest);
    } else {
      setRestBlogs(blogs);
    }
  }, [blogs, currentBlog]);

  if (!restBlogs || !blogs) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      {loadingUserBlog ? (
        <div className="w-full h-[200px] flex justify-center items-center">
          <p className="text-black font-Source text-[30px]">
            Loading User blogs
          </p>
        </div>
      ) : (
        <>
          {restBlogs.length <= 0 ? (
            <div className="w-full h-[200px] flex justify-center items-center">
              <p className="text-black font-Source text-[30px]">
                User don't have any blog posts found.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {restBlogs.map((blog, id) => (
                <BlogCard key={id} blog={blog} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default BlogCards;
