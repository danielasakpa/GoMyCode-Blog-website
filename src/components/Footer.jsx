import React from "react";

function Footer() {
  return (
    <div className="py-4 flex justify-between text-[#9B9B9B]">
      <div className="flex items-center space-x-4">
        <a href="/">
          <strong className="font-Playfair text-[20px] leading-[0] m-0 p-0 font-bold">
            Mundana
          </strong>
        </a>
        <span className="text-[13px] font-Source font-semibold">
          Copyright <span>&copy;</span> 2024 . All rights reserved.
        </span>
      </div>
      <span className="text-[13px] font-Source font-semibold">
        Designed by{" "}
        <span className="text-[#7832E2] font-bold cursor-pointer hover:underline hover:underline-offset-4">
          WowThemes.net
        </span>{" "}
        and Develop By{" "}
        <span className="text-[#7832E2] font-bold cursor-pointer hover:underline hover:underline-offset-4">
          Daniel Asakap
        </span>
        .
      </span>
    </div>
  );
}

export default Footer;
