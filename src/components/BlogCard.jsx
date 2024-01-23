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
      <div className="p-6">
        <div className="flex flex-wrap space-x-2 space-y-2 justify-start items-center mb-4">
          {blog.tags.map((tag, id) => (
            <span
              key={id}
              className="flex justify-center items-center mr-2 px-4 py-1 bg-blue-500 text-white rounded-full text-xs"
            >
              {tag}
            </span>
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
