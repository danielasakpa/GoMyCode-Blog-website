import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import AllStories from "../components/AllStories";
import Popular from "../components/Popular";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase-config";

function Home() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const blogRef = collection(db, "blogs");
      const newestBlosg = query(blogRef, orderBy("createdAt", "desc"));

      console.log(newestBlosg);
      const querySnapshot = await getDocs(newestBlosg);
      setData(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    };
    getData();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Header blogs={data} />
      <div className="flex space-x-2">
        <AllStories />
        <Popular />
      </div>
    </>
  );
}

export default Home;
