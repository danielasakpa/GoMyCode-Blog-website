// BlogDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db, doc } from "../util/firebase-config";
import { getDoc } from "firebase/firestore";
import Loader from "../components/Loader";
import BlogDetail from "../components/BlogDetail";

function EditBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const docRef = doc(db, "blogs", id);
        const blogDetail = await getDoc(docRef);

        setBlog(blogDetail.data());
      } catch (error) {
        console.error("Error fetching blog data:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
    return () => {
      setBlog({});
    };
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  return <BlogDetail blog={blog} id={id} />;
}

export default EditBlog;
