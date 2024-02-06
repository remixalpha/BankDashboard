import { Callout } from "@radix-ui/themes";
import { useEffect, useState } from "react";
// Api
import { uploadExcelFile } from "../api/api"; // Import the function to upload files
// Icons
import { CheckIcon } from "@heroicons/react/20/solid";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { FaFileExcel } from "react-icons/fa";
import { LuPencil } from "react-icons/lu";
import { PiUploadSimpleThin } from "react-icons/pi";
import { TiTick } from "react-icons/ti";

const UploadForm = () => {
  // Define the state to hold the selected file and whether it's uploaded
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [fileInputKey, setFileInputKey] = useState(0);

  // For Message Display
  const [showMessage, setShowMessage] = useState(false);
  const [isMessageShown, setIsMessageShown] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Function to handle file change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setIsFileUploaded(true);
    }
  };

  // Function to handle file upload
  const handleFileUpload = async () => {
    try {
      if (!selectedFile) {
        console.error("No file selected.");
        return;
      }

      // Call the function to upload the selected file
      await uploadExcelFile(selectedFile);

      // Optionally, you can add logic to handle success or show a success message
      console.log("File uploaded successfully.");

      // Set success message
      setIsSuccess(true);
      setMessage("File uploaded successfully.");
    } catch (error) {
      console.error("Error uploading file:", error.message);
      // Optionally, you can add logic to handle errors or show an error message

      // Set error message
      setIsSuccess(false);
      setMessage("Error uploading file. Please try again.");
    } finally {
      setShowMessage(true);
      setIsMessageShown(true);
      // Hide the message after a certain duration if needed
      setTimeout(() => {
        setShowMessage(false);
        setIsMessageShown(false);
      }, 5000);
    }
  };

  useEffect(() => {
    // Check if the message is shown
    if (isMessageShown) {
      // Set a timeout to reload the page after 5000 milliseconds (5 seconds)
      const reloadTimeout = setTimeout(() => {
        window.location.reload(); // Reload the page
      }, 5000);

      // Clean up the timeout to prevent memory leaks
      return () => clearTimeout(reloadTimeout);
    }
  }, [isMessageShown]);
  return (
    <>
      {showMessage && (
        <div className="relative flex justify-center mt-4  scale-110 h-full w-full">
          {isSuccess ? (
            <Callout.Root color="green">
              <Callout.Icon>
                <CheckIcon className="h-5 w-5" />
              </Callout.Icon>
              <Callout.Text>{message}</Callout.Text>
            </Callout.Root>
          ) : (
            <Callout.Root color="red" role="alert">
              <Callout.Icon>
                <ExclamationTriangleIcon className="h-5 w-5" />
              </Callout.Icon>
              <Callout.Text>{message}</Callout.Text>
            </Callout.Root>
          )}
        </div>
      )}

      <div className="flex space-y-10 flex-col justify-center h-4/5  w-2/6 mt-[5rem] p-12 rounded-xl border bg-lightPrimary shadow-xl  shadow-shadow-600 ">
        {/* Input field for file selection */}
        {/* <input type="file" accept=".xlsx" onChange={handleFileChange} /> */}
        <div className="flex justify-center cursor-pointer ">
          <div className="relative inline-block">
            <input
              id="fileInput"
              name="fileUrl"
              type="file"
              accept=".xlsx"
              key={fileInputKey}
              className="sr-only"
              onChange={(event) => {
                handleFileChange(event);
                setFileInputKey((prevKey) => prevKey + 1);
              }}
            />
            <label
              htmlFor="fileInput"
              className="relative flex items-center justify-center border-2 border-gray-400 border-dashed cursor-pointer w-52 h-52 rounded-xl"
            >
              {isFileUploaded ? (
                <div className="relative bg-green-400 h-[8rem] w-[8rem] rounded-full flex justify-center items-center">
                  <TiTick className="text-white text-8xl" />
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <FaFileExcel
                    className="w-12 mb-2 text-gray-800 h-12 "
                    alt="Placeholder"
                  />
                  <span className="text-gray-500">Upload a file</span>
                </div>
              )}
            </label>
            <label
              htmlFor="fileInput"
              className="absolute p-2 bg-white border shadow-lg cursor-pointer border-white bottom-4 -right-4 rounded-xl"
            >
              <div className="flex flex-col justify-end">
                <LuPencil
                  className="w-6 h-6 p-1 text-black "
                  aria-hidden="true"
                />
              </div>
            </label>
          </div>
        </div>
        {/* Button to trigger file upload */}
        {/* <button className="" onClick={handleFileUpload}>
          Upload
        </button> */}
        {/* Upload button */}
        <button
          type="submit"
          onClick={handleFileUpload}
          className="flex flex-row items-center justify-center px-3 py-2 space-x-2 text-white transition-all duration-300 bg-secondBlack shadow-lg cursor-pointer group rounded-xl"
        >
          <PiUploadSimpleThin className="w-6 h-6 p-1 text-white transition-transform duration-300 ease-in-out transform group-hover:-translate-y-1" />
          <span className="relative antialiased tracking-normal font-sans text-sm  leading-[1.3]">
            Upload
          </span>
        </button>
      </div>
    </>
  );
};

export default UploadForm;
