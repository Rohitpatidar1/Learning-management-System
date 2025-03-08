import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// ✅ Buffer se Cloudinary Upload
export const uploadMedia = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      (error, result) => {
        if (error) {
          console.error("Cloudinary Upload Error:", error);
          return reject(new Error("Cloudinary upload failed"));
        }
        resolve(result);
      }
    );

    uploadStream.end(fileBuffer);
  });
};

// ✅ Delete Media (Image/Video)
export const deleteMediaFromCloudinary = async (
  publicId,
  resourceType = "image"
) => {
  try {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });
  } catch (error) {
    console.error(`Cloudinary Delete Error (${resourceType}):`, error);
  }
};

export const deleteVideoFromCloudinary = async (publicId) => {
  // Cloudinary delete logic here
};
