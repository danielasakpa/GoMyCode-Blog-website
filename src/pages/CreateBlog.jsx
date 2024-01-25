import { useState, useEffect } from "react";
import Editor from "../components/Editor";
import Prism from "prismjs";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import {
  db,
  storage,
  getDownloadURL,
  ref,
  uploadBytes,
  collection,
  addDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "../util/firebase-config";
import { useAuth } from "../context/AuthContext"; // Adjust the path accordingly
import Loader from "../components/Loader";

function CreateBlog() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    topic: "",
    subTopic: "",
    blogImage: "",
    tags: [],
    customTagsInput: "",
    description: "",
  });
  const [Loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState("");
  const [formError, setFormError] = useState("");

  const recommendedTags = [
    "React",
    "JavaScript",
    "Web Development",
    "UI/UX",
    "Programming",
  ];

  const handleTagChange = (selectedTags) => {
    setFormData({ ...formData, tags: selectedTags });
  };

  const handleCustomTagInputChange = (e) => {
    setFormData({ ...formData, customTagsInput: e.target.value });
  };

  const handleAddCustomTag = () => {
    const customTag = formData.customTagsInput.trim();
    if (customTag !== "" && !formData.tags.includes(customTag)) {
      setFormData({
        ...formData,
        tags: [...formData.tags, customTag],
        customTagsInput: "",
      });
    }
  };

  const handleDeleteTag = (tag) => {
    const updatedTags = formData.tags.filter((t) => t !== tag);
    setFormData({ ...formData, tags: updatedTags });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    // Check if the selected file is an image
    if (file && file.type.startsWith("image/")) {
      const img = new Image();

      img.onload = () => {
        if (img.height >= 583 && img.height <= 710) {
          setFormData({ ...formData, blogImage: file });
          setImageError("");
        } else {
          setImageError("Image height must be between 583px and 710px.");
        }
      };

      img.src = URL.createObjectURL(file);
    } else {
      setImageError("Please select a valid image file.");
    }
  };
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const handleSaveBlog = async () => {
    if (
      !formData.topic ||
      !formData.subTopic ||
      !formData.blogImage ||
      !formData.description
    ) {
      setFormError("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);

      const docRef = await addDoc(collection(db, "blogs"), {
        topic: formData.topic,
        subTopic: formData.subTopic,
        tags: formData.tags,
        description: formData.description,
        userId: user.uid,
        createdAt: serverTimestamp(),
      });

      // Upload blog image to Firebase Storage
      if (formData.blogImage) {
        const imageRef = ref(storage, `blogImages/${uuidv4()}`);

        await uploadBytes(imageRef, formData.blogImage)
          .then((snapshot) => {
            getDownloadURL(snapshot.ref)
              .then(async (url) => {
                // Update the blog document with the image URL
                await updateDoc(doc(db, "blogs", docRef.id), {
                  blogImage: url,
                });
              })
              .catch((error) => {
                console.log(error.message);
              });
          })
          .catch((error) => {
            console.log(error.message);
          });
      }

      setLoading(false);
      navigate("/");
    } catch (error) {
      console.error("Error saving blog:", error);
    }
  };

  if (Loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-2xl mx-auto my-8 p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">Create a New Blog Post</h1>

      {/* Topic Input */}
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="topic"
        >
          Topic
        </label>
        <input
          type="text"
          id="topic"
          name="topic"
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
          value={formData.topic}
          onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
        />
      </div>

      {/* Sub-Topic Input */}
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="subTopic"
        >
          Sub-Topic
        </label>
        <input
          type="text"
          id="subTopic"
          name="subTopic"
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
          value={formData.subTopic}
          onChange={(e) =>
            setFormData({ ...formData, subTopic: e.target.value })
          }
        />
      </div>

      {/* Blog Image Input */}
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="blogImage"
        >
          Blog Image
        </label>
        <div className="flex items-center space-x-2">
          <input
            placeholder="Choose image"
            accept="image/png,image/jpeg"
            type="file"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
            onChange={handleImageChange}
          />
        </div>
        {imageError && (
          <p className="text-red-500 text-sm mt-2">{imageError}</p>
        )}
      </div>

      {/* Tags Input */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Tags
        </label>
        <div className="flex items-center space-x-2 mb-2">
          {recommendedTags.map((tag) => (
            <div
              key={tag}
              className={`px-2 py-1 bg-blue-200 text-blue-800 rounded cursor-pointer hover:bg-blue-300 ${
                formData.tags.includes(tag) ? "opacity-50" : ""
              }`}
              onClick={() =>
                !formData.tags.includes(tag) &&
                handleTagChange([...formData.tags, tag])
              }
            >
              {tag}
            </div>
          ))}
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Add custom tag"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
            value={formData.customTagsInput}
            onChange={handleCustomTagInputChange}
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleAddCustomTag}
          >
            Add
          </button>
        </div>
        <div className="mt-2">
          {formData.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-blue-200 text-blue-800 px-2 py-1 rounded mr-2 cursor-pointer hover:text-white hover:bg-red-500"
              onClick={() => handleDeleteTag(tag)}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Editor */}
      <div className="mb-4">
        <Editor formData={formData} setFormData={setFormData} />
      </div>
      {/* Save Button */}
      <div className="mt-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleSaveBlog}
        >
          Save Blog
        </button>
      </div>
      {formError && <p className="text-red-500 text-sm mt-2">{formError}</p>}
    </div>
  );
}

export default CreateBlog;
