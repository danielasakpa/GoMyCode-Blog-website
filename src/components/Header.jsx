import React from "react";
import { Link } from "react-router-dom";

function Header({ blogs }) {
  return (
    <>
      <section className="flex items-center mt-6 bg-[#E8F3EC] h-[455px] mb-[120px]">
        <div className="p-7 basis-1/2">
          <h1 className="font-Playfair text-[40px] leading-[50px] font-bold mb-6">
            {blogs[0]?.topic}
          </h1>
          <p className="font-Source text-[16px] mb-8">{blogs[0]?.subTopic}</p>
          <Link
            to={`/detail/${blogs[0]?.id}`}
            className="font-Source px-4 py-2 bg-[#202428] text-white hover:bg-[#fff] border hover:border-[#202428] hover:text-[#202428] rounded"
          >
            Read More
          </Link>
        </div>
        <div className="basis-1/2">
          <img
            src={blogs[0]?.blogImage}
            alt="homeImg"
            className="w-[542px] max-h-[583px]"
          />
        </div>
      </section>
    </>
  );
}

export default Header;
