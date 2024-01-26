// BlogCardSkeleton.jsx
import React from "react";

const BlogCardSkeleton = () => {
  return (
    <div className="bg-white w-[360px] max-h-[450px] rounded-lg overflow-hidden shadow-lg animate-pulse">
      <div className="w-full h-48 bg-gray-300"></div>
      <div className="py-6 px-2">
        <div className="flex space-x-2 flex-wrap mb-4">
          <div className="bg-blue-500 text-white rounded-md text-xs h-6 w-12 animate-pulse"></div>
          <div className="bg-blue-500 text-white rounded-md text-xs h-6 w-12 animate-pulse"></div>
          <div className="bg-blue-500 text-white rounded-md text-xs h-6 w-12 animate-pulse"></div>
        </div>
        <div className="h-6 bg-gray-300 w-4/5 mb-2 animate-pulse"></div>
        <div className="h-16 bg-gray-300 mb-2 animate-pulse"></div>
        <div className="h-4 bg-gray-300 w-3/4 mb-2 animate-pulse"></div>
        <div className="h-4 bg-gray-300 w-2/3 mb-2 animate-pulse"></div>
        <div className="h-4 bg-gray-300 w-1/2 animate-pulse"></div>
      </div>
    </div>
  );
};

export default BlogCardSkeleton;
