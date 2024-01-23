import React from "react";
import Blog8 from "../assets/img/demo/blog8.jpg";
import Blog9 from "../assets/img/demo/3.jpg";
import Blog10 from "../assets/img/demo/5.jpg";

function AllStories() {
  return (
    <div className="pb-24 px-15 basis-2/3 ">
      <h2 className="font-Source text-[20px] font-[700] leading-[1.2] underline underline-[700] underline-offset-[20px] mb-[64px]">
        All Stories
      </h2>
      <div className="flex flex-col space-y-[16px]">
        <div className="flex items-start space-x-3">
          <div>
            <a
              href="/#"
              className="block font-Source text-[1.5em] font-[700] leading-[1.2] mb-3 hover:text-[#03A87C] hover:underline hover:underline-offset-4"
            >
              Nearly 200 Great Barrier Reef coral species also live in the deep
              sea
            </a>
            <p className="font-Source text-[16px] mb-4">
              There are more coral species lurking in the deep ocean that
              previously thought.
            </p>
            <p className="text-[#9B9B9B] text-[14px] mb-1">
              Jake Bittle in LOVE/HATE
            </p>
            <p className="text-[#9B9B9B] text-[14px]"> Dec 12 · 5 min read </p>
          </div>
          <img src={Blog8} alt="" className="w-[180px] h-[120px] " />
        </div>
        <div className="flex items-start space-x-3">
          <div>
            <a
              href="/#"
              className="block font-Source text-[1.5em] font-[700] leading-[1.2] mb-3 hover:text-[#03A87C] hover:underline hover:underline-offset-4"
            >
              East Antarctica's glaciers are stirring
            </a>
            <p className="font-Source text-[16px] mb-4">
              Nasa says it has detected the first signs of significant melting
              in a swathe of glaciers in East Antarctica.
            </p>
            <p className="text-[#9B9B9B] text-[14px] mb-1">
              Jake Bittle in LOVE/HATE
            </p>
            <p className="text-[#9B9B9B] text-[14px]"> Dec 12 · 5 min read </p>
          </div>
          <img src={Blog9} alt="" className="w-[180px] h-[120px] " />
        </div>
        <div className="flex items-start space-x-3">
          <div>
            <a
              href="/#"
              className="block font-Source text-[1.5em] font-[700] leading-[1.2] mb-3 hover:text-[#03A87C] hover:underline hover:underline-offset-4"
            >
              50 years ago, armadillos hinted that DNA wasn’t destiny
            </a>
            <p className="font-Source text-[16px] mb-4">
              Nasa says it has detected the first signs of significant melting
              in a swathe of glaciers in East Antarctica.
            </p>
            <p className="text-[#9B9B9B] text-[14px] mb-1">
              Jake Bittle in LOVE/HATE
            </p>
            <p className="text-[#9B9B9B] text-[14px]"> Dec 12 · 5 min read </p>
          </div>
          <img src={Blog10} alt="" className="w-[180px] h-[120px] " />
        </div>
      </div>
    </div>
  );
}

export default AllStories;
