import React from "react";
import { Link } from "react-router-dom";

function BlogCard({ blog }) {
  const truncateSubTopic = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
  };

  return (
    <div className="bg-white w-[360px] max-h-[450px] rounded-lg overflow-hidden shadow-lg">
      <img
        src={blog.blogImage}
        alt={blog.topic}
        className="w-full h-48 object-cover object-center"
      />
      <div className="py-6 px-2">
        <div className="flex space-x-2 flex-wrap mb-4">
          {blog.tags.slice(0, 3).map((tag, id) => (
            <div
              key={id}
              className="flex justify-center items-center px-4 py-2 bg-blue-500 text-white rounded-md text-xs"
            >
              {tag}
            </div>
          ))}
        </div>
        <Link to={`/detail/${blog.id}`}>
          <h2 className="font-Playfair text-[1.2em] font-[700] leading-[1.2] mb-2 hover:text-[#03A87C] hover:underline hover:underline-offset-4">
            {blog.topic}
          </h2>
        </Link>
        <p className="text-gray-600">{truncateSubTopic(blog.subTopic, 100)}</p>
      </div>
    </div>
  );
}

export default BlogCard;
