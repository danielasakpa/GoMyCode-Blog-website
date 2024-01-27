import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import {
  auth,
  db,
  doc,
  storage,
  getDownloadURL,
  ref,
  uploadBytes,
} from "../util/firebase-config";
import { updateProfile } from "firebase/auth";
import { useAuth } from "../context/AuthContext"; // Adjust the path accordingly
import BlogCards from "../components/BlogCards";
import Loader from "../components/Loader";

function Profile() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const [blogs, setBlogs] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [editedUser, setEditedUser] = useState({
    displayName: user.displayName || "",
    email: user.email || "",
    photoURL: user.photoURL || "",
  });

  useEffect(() => {
    const getBlogsByUser = async () => {
      if (user) {
        const blogRef = collection(db, "blogs");
        const q = query(blogRef, where("userId", "==", user.uid));

        const querySnapshot = await getDocs(q);
        setBlogs(
          querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      }
      setLoadingBlogs(false);
    };
    getBlogsByUser();
    return () => setBlogs([]);
  }, [user]);

  function onLogout() {
    auth.signOut();
    localStorage.removeItem("user");
    navigate("/signin");
  }

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEditedUser((prevData) => ({ ...prevData, photoURL: file }));
  };

  const handleSaveClick = async (e) => {
    setIsEditing(false);
    setLoading(true);

    e.preventDefault();

    try {
      if (editedUser.photoURL) {
        const imageRef = ref(storage, `profileImage/${uuidv4()}`);

        await uploadBytes(imageRef, editedUser.photoURL)
          .then((snapshot) => {
            getDownloadURL(snapshot.ref)
              .then(async (url) => {
                const updatedProfile = {
                  ...(editedUser.displayName !== user.displayName && {
                    displayName: editedUser.displayName,
                  }),
                  ...(editedUser.email !== user.email && {
                    email: editedUser.email,
                  }),
                  ...(editedUser.photoURL !== user.photoURL && {
                    photoURL: url,
                  }),
                };

                await updateProfile(auth.currentUser, updatedProfile);

                const updatedUser = auth.currentUser;

                await updateDoc(
                  doc(db, "users", updatedUser.uid),
                  updatedProfile
                );

                setUser(updatedUser);
                setLoading(false);
                console.log("User was updated successfully");
              })
              .catch((error) => {
                console.error(error.message);
              });
          })
          .catch((error) => {
            console.error(error.message);
          });
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error updating user:", errorCode, errorMessage);
    }
  };

  const handleCancelClick = () => {
    // Reset edited user information
    setEditedUser({
      displayName: user.displayName || "",
      email: user.email || "",
      photoURL: user.photoURL || "",
    });
    // Set isEditing to false
    setIsEditing(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="p-6 mb-[120px] bg-[#E8F3EC]">
        <div className="flex items-center mb-4">
          <div className="relative w-20 h-20 rounded-full bg-gray-200 mr-4">
            <img
              src={user.photoURL || "default-profile-image.jpg"}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />

            {isEditing && (
              <label
                htmlFor="profileImageInput"
                className="absolute -bottom-2 -right-2 bg-blue-500 rounded-full p-2 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4c4.4183 0 8 3.5817 8 8s-3.5817 8-8 8-8-3.5817-8-8 3.5817-8 8-8zm0 2a6 6 0 100 12 6 6 0 000-12zm-3 6a1 1 0 112 0 1 1 0 01-2 0zm3 2a3 3 0 100-6 3 3 0 000 6z"
                  />
                </svg>
              </label>
            )}

            <input
              id="profileImageInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>

          <div>
            <h2 className="text-2xl font-semibold">{user.displayName}</h2>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Edit Profile</h3>

          {/* Editable user information */}
          <div className="mb-4">
            <label
              htmlFor="displayName"
              className="block text-sm font-medium text-gray-600"
            >
              Display Name
            </label>
            <input
              type="text"
              id="displayName"
              name="displayName"
              value={editedUser.displayName}
              onChange={(e) =>
                setEditedUser({ ...editedUser, displayName: e.target.value })
              }
              className="mt-1 p-2 border rounded-md w-full"
              readOnly={!isEditing}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={editedUser.email}
              onChange={(e) =>
                setEditedUser({ ...editedUser, email: e.target.value })
              }
              className="mt-1 p-2 border rounded-md w-full"
              readOnly={!isEditing}
            />
          </div>

          {/* Save and Cancel buttons */}
          {isEditing ? (
            <div className="flex space-x-4">
              <button
                onClick={handleSaveClick}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Save
              </button>
              <button
                onClick={handleCancelClick}
                className="px-4 py-2 bg-gray-500 text-white rounded-md"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={handleEditClick}
              className="px-4 py-2 bg-green-500 text-white rounded-md"
            >
              Edit Profile
            </button>
          )}
        </div>

        <div className="mt-8">
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-md"
          >
            Logout
          </button>
        </div>
      </div>
      <section className="mb-[40px]">
        <h2 className="font-Source text-[20px] font-[700] leading-[1.2] underline underline-[700] underline-offset-[20px] mb-[64px]">
          Your Blogs
        </h2>
        <BlogCards
          blogs={blogs}
          loadingBlogs={loadingBlogs}
          type={"user-blog"}
        />
      </section>
    </>
  );
}

export default Profile;
