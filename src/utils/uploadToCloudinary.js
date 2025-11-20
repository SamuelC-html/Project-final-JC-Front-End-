import axios from "axios";

export const uploadToCloudinary = async (file) => {
  try {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUDNAME;

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData
    );

    return response.data.secure_url; // URL final de la imagen
  } catch (error) {
    console.error("❌ Error subiendo imagen a Cloudinary:", error);
    throw error;
  }
};
