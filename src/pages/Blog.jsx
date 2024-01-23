import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProfileIMmg from "../assets/img/demo/avatar2.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReadNext from "../components/ReadNext";
import {
  doc,
  getDoc,
  getDocs,
  where,
  collection,
  query,
} from "firebase/firestore";
import { db } from "../firebase-config";
import parse from "html-react-parser";
import { useAuth } from "../context/AuthContext"; // Adjust the path accordingly

export default function Blog() {
  const { id } = useParams();
  const { user, userLoading } = useAuth();

  const [data, setData] = useState({});
  const [blogs, setBlogs] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const docRef = doc(db, "blogs", id);
      const blogDetail = await getDoc(docRef);
      setData(blogDetail.data());

      // Check if user and user.uid exist before making the query
      if (user && user.uid) {
        const blogRef = collection(db, "blogs");
        const Blogs = query(blogRef, where("userId", "==", user.uid));

        const querySnapshot = await getDocs(Blogs);
        setBlogs(
          querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      }

      setLoading(false);
    };

    getData();
  }, [user, id]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  console.log("data", data);

  const renderedDescription = parse(`${data?.description}`);

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
            {/* Sterling could jump 8% if Brexit deal gets approved by UK Parliament */}
            {data?.topic}
          </h1>
          <p className="font-Source text-[16px] mb-[16px]">
            {/* Analysts told CNBC that the currency could hit anywhere between
            <br />
            $1.35-$1.40 if the deal gets passed through the U.K. parliament. */}
            {data?.subTopic}
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
          <img
            src={data?.blogImage}
            alt="BlogImg"
            className="w-[542px] h-[583px]"
          />
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
          <div className="w-[730px] font-[Georgia] text-[20px] leading-[36px]">
            {renderedDescription}
          </div>
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
        <ReadNext blogs={blogs} currentBlog={id} />
      </section>
    </>
  );
}
