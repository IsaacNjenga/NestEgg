import React from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { Button, Image } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const cloudName = process.env.REACT_APP_CLOUD_NAME;
const presetKey = process.env.REACT_APP_PRESET_KEY;
function ImageUploads({
  setImageUploading,
  imageUrls,
  imagePublicIds,
  setLoading,
  setImagePublicIds,
  setImageUrls,
}) {
  const handleImageUpload = (e) => {
    Swal.fire({
      title: "Uploading your image...",
      text: "Please wait",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    setImageUploading(true);
    const files = Array.from(e.target.files); // Get all selected files
    const maxSize = 10 * 1024 * 1024;

    // Check each file size
    for (let file of files) {
      if (file.size > maxSize) {
        setImageUploading(false);
        return Swal.fire({
          icon: "error",
          title: "File exceeds limit!",
          text: "Please select a file less than 10MB",
          confirmButtonText: "OK",
        });
      }
    }

    const cloud_name = cloudName;
    const preset_key = presetKey;
    let newImageUrls = [];
    let newImagePublicIds = [];

    const uploadPromises = files.map((file) => {
      const formImageData = new FormData();
      formImageData.append("file", file);
      formImageData.append("upload_preset", preset_key);

      return axios
        .post(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          formImageData,
          { withCredentials: false }
        )
        .then((res) => {
          // For each uploaded image, update the arrays setImageUploading(true);

          newImageUrls.push(res.data.secure_url);
          newImagePublicIds.push(res.data.public_id);
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Failed to upload image",
            text: "There was an unexpected error. Please try again",
            confirmButtonText: "OK",
          });
        });
    });

    // After all uploads are done, update the state
    Promise.all(uploadPromises)
      .then(() => {
        Swal.fire({ icon: "success", title: "Profile set successfully" });
        setImageUploading(false);

        setImageUrls((prevImages) => [...prevImages, ...newImageUrls]);
        setImagePublicIds((prevIds) => [...prevIds, ...newImagePublicIds]);
      })
      .catch((error) => {
        setImageUploading(false);
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Failed to upload your profile picture",
          text: "There was an unexpected error. Please try again",
          confirmButtonText: "OK",
        });
      });
  };

  const deletePicture = (e, publicId) => {
    e.preventDefault();
    if (!publicId) {
      return Swal.fire({
        icon: "error",
        title: "No image to delete!",
        text: "You have not selected a valid image to delete",
        confirmButtonText: "OK",
      });
    }
    Swal.fire({
      title: "Removing your image...",
      text: "Please wait",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    setLoading(true);

    axios
      .post("image/delete-image", { publicId })
      .then(() => {
        setImageUrls((prevImages) =>
          prevImages.filter((_, index) => imagePublicIds[index] !== publicId)
        );
        setImagePublicIds((prevIds) => prevIds.filter((id) => id !== publicId));
        setLoading(false);
        Swal.fire({ icon: "success", title: "Image removed!" });
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        const errorMessage =
          error.response && error.response.data && error.response.data.error
            ? error.response.data.error
            : "An unexpected error occurred. Please try again later.";

        Swal.fire({
          icon: "warning",
          title: "Failed to delete!",
          text: errorMessage,
          confirmButtonText: "OK",
        });
      });
  };

  return (
    <div
      label={
        <span style={{ fontSize: 16, fontWeight: 500 }}>
          Upload your profile picture
        </span>
      }
    >
      <input
        id="file-upload"
        accept="image/*"
        type="file"
        onChange={handleImageUpload}
      />
      {imageUrls.length > 0 ? (
        <div style={{ marginTop: 10 }}>
          {imageUrls.map((url, index) => (
            <div
              key={imagePublicIds[index]}
              style={{
                position: "relative",
                display: "inline-block",
                marginRight: 8,
              }}
            >
              <Button
                type="text"
                shape="circle"
                icon={<DeleteOutlined />}
                onClick={(e) => deletePicture(e, imagePublicIds[index])}
                style={{
                  position: "absolute",
                  top: -10,
                  right: -10,
                  zIndex: 1,
                  background: "white",
                }}
              />
              <Image
                src={url}
                alt="uploaded"
                style={{
                  width: 120,
                  height: 120,
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
            </div>
          ))}
        </div>
      ) : (
        <p style={{ marginTop: 10, color: "#999" }}>No image uploaded.</p>
      )}
    </div>
  );
}

export default ImageUploads;
