import React from "react";
import Editor from "../components/Editor";

function BlogForm({
  formData,
  setFormData,
  imageError,
  formError,
  handleTagChange,
  handleCustomTagInputChange,
  handleAddCustomTag,
  handleDeleteTag,
  handleImageChange,
  handleSaveBlog,
}) {
  const recommendedTags = [
    "React",
    "JavaScript",
    "Web Development",
    "UI/UX",
    "Programming",
  ];

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
        <div className="flex gap-2 flex-wrap mt-2">
          {formData.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-blue-200 text-blue-800 px-2 py-1 rounded cursor-pointer hover:text-white hover:bg-red-500"
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

export default BlogForm;
