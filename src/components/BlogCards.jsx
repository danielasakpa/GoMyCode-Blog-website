import React from "react";
import BlogCard from "./BlogCard";

function BlogCards({ blogs }) {
  return (
    <div>
      <h2 className="font-Source text-[20px] font-[700] leading-[1.2] underline underline-[700] underline-offset-[20px] mb-[64px]">
        Your Blogs
      </h2>
      <div className="flex flex-wrap space-x-4 space-y-6 justify-start">
        {blogs.map((blog, id) => (
          <BlogCard key={id} blog={blog} />
        ))}
      </div>
    </div>
  );
}

export default BlogCards;
