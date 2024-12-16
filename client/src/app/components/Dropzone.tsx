'use client';
import React, { useState } from 'react';
import Image from 'next/image';

export default function Dropzone() {
  const [previewImage, setPreviewImage] = useState<string>("");
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [upscaledImageUrl, setUpscaledImageUrl] = useState<string>("");
  const [loadingState, setLoadingState] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setUploadedImage(file);
      setErrorMessage("");
    }
  };

  const handleFileUpload = async () => {
    setLoadingState(true);
    if (!uploadedImage) return;

    const formData = new FormData();
    formData.append('file', uploadedImage);

    try {
      const response = await fetch('https://mage-ai-ddpy.onrender.com/upscale/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const upscaledImageUrl = URL.createObjectURL(blob);
        setUpscaledImageUrl(upscaledImageUrl);
        setPreviewImage(upscaledImageUrl);
      } else {
        setErrorMessage("Failed to upscale the image!");
      }
    } catch (e:unknown) {
        if(e instanceof Error) {
          setErrorMessage("Error uploading image"+e);
        } else {
          setErrorMessage("An unexpected error occurred while uploading the image!");
        }
      } finally {
      setLoadingState(false);
    }
  };

  return (
    <div className="flex flex-col gap-y-10 items-center justify-center w-full">
      <div className="flex justify-between w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-1/2 h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        {previewImage ? (
          <div className="flex ml-4 w-1/2 items-center justify-center border-gray-600 border rounded-xl">
            <Image
              src={previewImage}
              alt="Preview"
              className="object-cover rounded-lg h-64 w-full"
              width={256}
              height={256}
            />
          </div>
        ) : (
          <div className='flex ml-4 w-1/2 items-center justify-center border-gray-600 border rounded-xl'>
            <h2 className="text-gray-600 text-center p-4">Image preview here!</h2>
          </div>
        )}
      </div>

      {errorMessage && (
        <div className="text-red-500 text-lg font-semibold">
          {errorMessage}
        </div>
      )}

      {!loadingState ? (
        <button
          type="button"
          onClick={handleFileUpload}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Let&apos;s Go!
        </button>
      ) : (
        <div className="text-white text-lg font-semibold ">
          Loading...This will take a while...
        </div>
      )}

      {upscaledImageUrl && (
        <a
          href={upscaledImageUrl}
          download="upscale_image.png"
          className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Download Upscaled Image
        </a>
      )}
    </div>
  );
}
