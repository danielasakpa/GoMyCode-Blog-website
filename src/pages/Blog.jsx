import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BlogCards from "../components/BlogCards";
import {
  doc,
  getDoc,
  getDocs,
  where,
  orderBy,
  collection,
  query,
} from "firebase/firestore";
import { auth, db } from "../util/firebase-config";
import parse from "html-react-parser";
import Loader from "../components/Loader";

export default function Blog() {
  const { id } = useParams();

  const [blog, setBlog] = useState({});
  const [blogs, setBlogs] = useState([]);
  const [blogUser, setBlogUser] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);

      const docRef = doc(db, "blogs", id);
      const blogDetail = await getDoc(docRef);
      setBlog(blogDetail.data());

      const blogRef = collection(db, "blogs");
      const q = query(blogRef, orderBy("createdAt", "desc"));

      const querySnapshot = await getDocs(q);
      setBlogs(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };

    getData();
  }, [id]);

  useEffect(() => {
    const getUserData = async () => {
      if (blog && blog.userId) {
        console.log(" blog.userId", blog.userId);
        const usersCollectionRef = collection(db, "users");
        const q = query(usersCollectionRef, where("id", "==", blog.userId));
        const querySnapshot = await getDocs(q);

        setBlogUser(
          querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      }
      setLoading(false);
    };

    return () => getUserData();
  }, [blog]);

  if (loading || !blog || !blogs || !blogUser) {
    return <Loader />;
  }

  const formattedDate = blog?.createdAt?.toDate().toDateString();

  const renderedDescription = parse(`${blog?.description}`);

  return (
    <>
      <section className="flex items-center mt-[20px] py-6 h-[max-content] mb-[25px]">
        <div className="basis-1/2 py-[20px] pr-[80px] pl-[15px]">
          <a
            href="/blog"
            className="block font-Source text-[16px] text-[#EA2F65] font-[700] mb-[18px] hover:underline hover:underline-offset-1"
          >
            STORIES
          </a>
          <h1 className="font-Playfair text-[56px] leading-[1.2em] font-bold mb-[16px]">
            {blog?.topic}
          </h1>
          <p className="font-Source text-[16px] mb-[16px]">{blog?.subTopic}</p>
          <div className="flex items-center space-x-5">
            <img
              src={blogUser[0]?.photoURL || "default-profile-image.jpg"}
              alt=""
              className="h-[70px] w-[70px] rounded-full"
            />
            <div>
              <span className="font-Source text-[14px] block mb-1 font-medium">
                {blogUser[0]?.displayName || "Jane Seymour"}
              </span>
              <span className="font-Source text-[14px] block font-medium text-[#9B9B9B]">
                {formattedDate} · 5 min. read
              </span>
            </div>
          </div>
        </div>
        <div className="basis-1/2">
          <img
            src={blog?.blogImage}
            alt="BlogImg"
            className="w-[542px] max-h-[583px]"
          />
        </div>
      </section>
      <section className="flex py-[48px] px-[15px]">
        <div className="flex justify-end mr-16 basis-1/4">
          <div className="sticky top-[80px] z-40 h-[max-content] w-[max-content] flex flex-col items-center justify-start">
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
      <section className="mb-[40px]">
        <h2 className="font-Source text-[20px] font-[700] leading-[1.2] underline underline-[700] underline-offset-[20px] mb-[64px]">
          Read Next
        </h2>
        <BlogCards blogs={blogs} currentBlog={id} />
      </section>
    </>
  );
}
