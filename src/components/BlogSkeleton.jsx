import React from "react";
import BlogCards from "./BlogCards";

const BlogSkeleton = () => {
  return (
    <>
      <section className="flex items-center mt-[20px] py-6 h-[max-content] mb-[25px]">
        <div className="basis-1/2 py-[20px] pr-[80px] pl-[15px]">
          <div className="h-6 bg-gray-400 w-[60%] rounded mb-2 animate-pulse" />
          <div className="h-4 bg-gray-400 w-[80%] mb-4 animate-pulse" />
          <div className="h-4 bg-gray-400 w-[60%] mb-8 animate-pulse" />
          <div className="h-10 bg-gray-400 rounded w-[80%] animate-pulse" />
        </div>
        <div className="basis-1/2">
          <div className="w-[542px] h-[583px] rounded animate-pulse bg-gray-300" />
        </div>
      </section>
      <section className="flex py-[48px] px-[15px]">
        <div className="flex justify-end mr-16 basis-1/4">
          <div className="sticky top-[80px] z-40 h-[max-content] w-[max-content] flex flex-col items-center justify-start">
            <div className="h-6 bg-gray-400 w-[40%] rounded mb-2 animate-pulse" />
            <div className="h-4 bg-gray-400 w-[60%] mb-4 animate-pulse" />
            <div className="h-4 bg-gray-400 w-[50%] mb-8 animate-pulse" />
          </div>
          <div className="h-full"></div>
        </div>
        <div className="basis-3/4">
          <div className="w-[730px] h-[400px] bg-gray-300 animate-pulse" />
          <div className="flex items-center p-14 my-4 bg-[#E8F3EC]">
            <div className="pr-8 basis-1/2">
              <div className="h-8 bg-gray-400 w-[50%] rounded mb-2 animate-pulse" />
              <div className="h-6 bg-gray-400 w-[70%] animate-pulse" />
            </div>
            <div className="basis-2/3">
              <div className="h-10 bg-gray-400 rounded w-[80%] animate-pulse mb-3" />
              <button className="w-full h-12 bg-gray-400 animate-pulse rounded"></button>
            </div>
          </div>
        </div>
      </section>
      <section className="mb-[40px]">
        <div className="h-6 bg-gray-400 w-[40%] rounded mb-10 animate-pulse" />
        <BlogCards blogs={[]} currentBlog={null} loadingUserBlog={true} />
      </section>
    </>
  );
};

export default BlogSkeleton;
