import { useEffect, useState } from "react";
import Prism from "prismjs";
import { useNavigate } from "react-router-dom";
import {
    db,
    doc,
} from "../util/firebase-config";
import { useAuth } from "../context/AuthContext";
import { addBlogData, updateBlogData, uploadBlogImage } from "../api/blog";
import { validateBlogForm, shouldUploadImage } from "../util/formValidation";
import { getUpdatedBlog } from "../util/blogUtils";


function useBlogForm(initialData, mode, blog, id) {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [formData, setFormData] = useState(initialData);
    const [imageError, setImageError] = useState("");
    const [formError, setFormError] = useState("");
    const [formLoading, setFormLoading] = useState(false);

    useEffect(() => {
        if (mode === "edit") {
            setFormData({
                topic: blog.topic || "",
                subTopic: blog.subTopic || "",
                blogImage: blog.blogImage || "",
                tags: blog.tags || [],
                customTagsInput: "",
                description: blog.description || "",
            });
        } else {
            setFormData(initialData);
        }

        return () => {
            setFormData({});
        };
    }, [mode, blog]);


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
                if (img.height >= 400 && img.height <= 710) {
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


    const handleUpdateBlog = async () => {
        try {
            validateBlogForm(setFormError, formData);
            setFormLoading(true);


            const updatedBlog = getUpdatedBlog(formData, blog);

            console.log(updatedBlog)

            const docRef = doc(db, "blogs", id);

            await updateBlogData(docRef, updatedBlog);

            if (shouldUploadImage(formData, blog)) {
                await uploadBlogImage(docRef, formData);
            }

            console.log("Blog was updated successfully");
            navigate(`/detail/${id}`);
        } catch (error) {
            console.error("Error saving blog:", error);
        } finally {
            setFormLoading(false);
        }
    };

    const handleCreateBlog = async () => {
        try {
            validateBlogForm(setFormError, formData);
            setFormLoading(true);

            const res = await addBlogData(formData, user);

            const docRef = doc(db, "blogs", res.id);

            if (formData.blogImage) {
                await uploadBlogImage(docRef, formData);
            }

            console.log("Blog was created successfully");
            navigate("/");
        } catch (error) {
            console.error("Error saving blog:", error);
        } finally {
            setFormLoading(false);
        }
    };

    return {
        formData,
        imageError,
        formError,
        formLoading,
        setFormData,
        setFormLoading,
        handleTagChange,
        handleCustomTagInputChange,
        handleAddCustomTag,
        handleDeleteTag,
        handleImageChange,
        handleCreateBlog,
        handleUpdateBlog
    };
}

export default useBlogForm;
