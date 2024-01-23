import React from "react";
import BlogImg from "../assets/img/demo/intro.jpg";
import ProfileIMmg from "../assets/img/demo/avatar2.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReadNext from "../components/ReadNext";

export default function Blog() {
  return (
    <>
      <section className="flex items-center mt- h-[683px]">
        <div className="basis-1/2 py-[80px] pr-[80px] pl-[15px]">
          <a
            href="/blog"
            className="block font-Source text-[16px] text-[#EA2F65] font-[700] mb-[18px] hover:underline hover:underline-offset-1"
          >
            STORIES
          </a>
          <h1 className="font-Playfair text-[56px] leading-[1.2em] font-bold mb-[16px]">
            Sterling could jump 8% if Brexit deal gets approved by UK Parliament
          </h1>
          <p className="font-Source text-[16px] mb-[16px]">
            Analysts told CNBC that the currency could hit anywhere between
            <br />
            $1.35-$1.40 if the deal gets passed through the U.K. parliament.
          </p>
          <div className="flex items-center space-x-5">
            <img
              src={ProfileIMmg}
              alt=""
              className="h-[70px] w-[70px] rounded-full"
            />
            <div>
              <span className="font-Source text-[14px] block mb-1 font-medium">
                Jane Seymour
              </span>
              <span className="font-Source text-[14px] block font-medium text-[#9B9B9B]">
                A few hours ago · 5 min. read
              </span>
            </div>
          </div>
        </div>
        <div className="basis-1/2">
          <img src={BlogImg} alt="BlogImg" className="w-[542px] h-[683px]" />
        </div>
      </section>
      <section className="flex py-[48px] px-[15px]">
        <div className="flex justify-end mr-16 basis-1/4">
          <div className="sticky top-[70px] z-40 h-[max-content] w-[max-content] flex flex-col items-center justify-start">
            <span className="block font-Source text-[#9B9B9B] text-[16px] mb-[16px]">
              Share this
            </span>
            <div className="flex flex-col space-y-5">
              <div className="flex items-center justify-center w-10 h-10 p-2 text-white bg-[#0166FF] rounded-full cursor-pointer">
                <FontAwesomeIcon icon="fa-solid fa-plus" />
              </div>
              <div className="flex items-center justify-center w-10 h-10 p-2 text-white bg-[#0166FF] rounded-full cursor-pointer">
                <FontAwesomeIcon icon="fa-brands fa-facebook" />
              </div>
              <div className="flex items-center justify-center w-10 h-10 p-2 text-white bg-[#0166FF] rounded-full cursor-pointer">
                <FontAwesomeIcon icon="fa-brands fa-twitter" />
              </div>
            </div>
          </div>
          <div class="h-full"></div>
        </div>
        <div className="basis-3/4">
          <p className="w-[730px] font-[Georgia] text-[20px] leading-[36px]">
            Holy grail funding non-disclosure agreement advisor ramen
            bootstrapping ecosystem. Beta crowdfunding iteration assets business
            plan paradigm shift stealth mass market seed money rockstar niche
            market marketing buzz market. Burn rate release facebook termsheet
            equity technology. Interaction design rockstar network effects
            handshake creative startup direct mailing. Technology influencer
            direct mailing deployment return on investment seed round. Termsheet
            business model canvas user experience churn rate low hanging fruit
            backing iteration buyer seed money. Virality release launch party
            channels validation learning curve paradigm shift hypotheses
            conversion. Stealth leverage freemium venture startup
            business-to-business accelerator market. Freemium non-disclosure
            agreement lean startup bootstrapping holy grail ramen MVP iteration
            accelerator. Strategy market ramen leverage paradigm shift seed
            round entrepreneur crowdfunding social proof angel investor partner
            network virality.
          </p>
          <div className="flex items-center p-14 my-4 bg-[#E8F3EC]">
            <div className="pr-8 basis-1/2">
              <p className="font-Playfair text-[20px] mb-2 font-[700]">
                Become a member
              </p>
              <p className="font-Source text-[16px]">
                Get the latest news right in your inbox. We never spam
              </p>
            </div>
            <div className="basis-2/3">
              <input
                type="text"
                name="fName"
                id="fName"
                placeholder="Enter your e-mail adress"
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-6 mb-3 text-base font-medium text-[#9B9B9B] outline-none focus:border-[#03A87C]"
              />
              <button className="w-full px-8 py-2 bg-[#03A87C] text-white rounded">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="py-24">
        <h2 className="font-Source text-[20px] font-[700] leading-[1.2] underline underline-[700] underline-offset-[20px] mb-[64px]">
          Read Next
        </h2>
        <ReadNext />
      </section>
    </>
  );
}
