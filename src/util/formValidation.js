export const validateEmail = (setErrors, formData) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
        setErrors((prevErrors) => ({ ...prevErrors, email: "Invalid email" }));
    } else {
        setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
    }
};

export const validatePassword = (setErrors, formData) => {
    const passwordRegex = /^.{6,}$/;

    if (!passwordRegex.test(formData.password)) {
        setErrors((prevErrors) => ({
            ...prevErrors,
            password: "Password must be at least 6 characters",
        }));
    } else {
        setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
    }
};

export const validateConfirmPassword = (setErrors, formData) => {
    if (formData.confirmPassword !== formData.password) {
        setErrors((prevErrors) => ({
            ...prevErrors,
            confirmPassword: "Passwords do not match",
        }));
    } else {
        setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: "" }));
    }
};

export const validateDisplayName = (setErrors, formData) => {
    if (formData.displayName.trim() === "") {
        setErrors((prevErrors) => ({
            ...prevErrors,
            displayName: "Display Name is required",
        }));
    } else {
        setErrors((prevErrors) => ({ ...prevErrors, displayName: "" }));
    }
};

export const validateBlogForm = (setFormError, formData) => {
    if (
        !formData.topic ||
        !formData.subTopic ||
        !formData.blogImage ||
        !formData.description
    ) {
        setFormError("Please fill in all required fields.");
        throw new Error("Form validation failed");
    }
};

export const shouldUploadImage = (formData, blog) => formData.blogImage !== blog.blogImage;