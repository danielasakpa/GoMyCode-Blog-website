import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../util/firebase-config";
import BlogCards from "../components/BlogCards";
import Loader from "../components/Loader";

function Home() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const blogRef = collection(db, "blogs");
      const q = query(blogRef, orderBy("createdAt", "desc"));

      const querySnapshot = await getDocs(q);
      setData(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    };
    getData();
    return () => setData({});
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Header blogs={data} />
      <section className="mb-[40px]">
        <h2 className="font-Source text-[20px] font-[700] leading-[1.2] underline underline-[700] underline-offset-[20px] mb-[64px]">
          More Blogs
        </h2>
        <BlogCards blogs={data} currentBlog={data[0]?.id} />
      </section>
    </>
  );
}

export default Home;
