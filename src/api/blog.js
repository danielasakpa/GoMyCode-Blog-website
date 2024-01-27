import { v4 as uuidv4 } from "uuid";
import {
    storage,
    getDownloadURL,
    collection,
    ref,
    uploadBytes,
    updateDoc,
    doc,
    db,
    addDoc,
    serverTimestamp,
} from "../util/firebase-config";
import { deleteDoc } from "firebase/firestore";

export const updateBlogData = async (docRef, updatedBlog) => {
    await updateDoc(docRef, updatedBlog);
};

export const uploadBlogImage = async (docRef, formData) => {
    try {
        const imageRef = ref(storage, `blogImages/${uuidv4()}`);
        await uploadBytes(imageRef, formData.blogImage);

        const snapshot = await getDownloadURL(imageRef);
        await updateDoc(docRef, {
            blogImage: snapshot,
        });
    } catch (error) {
        console.error("Error uploading blog image:", error);
    }
};

export const addBlogData = async (formData, user) => {
    try {

        const res = await addDoc(collection(db, "blogs"), {
            topic: formData.topic,
            subTopic: formData.subTopic,
            tags: formData.tags,
            description: formData.description,
            userId: user.uid,
            createdAt: serverTimestamp(),
        });

        return res;

    } catch (error) {
        console.error("Error uploading blog image:", error);
    }
}


export const deleteBlog = async (id) => {
    try {
        const blogRef = doc(db, 'blogs', id);

        await deleteDoc(blogRef);

        console.log("Blog was deleted successfully");
    } catch (error) {
        console.error("Error deleting blog:", error);

    }
}
