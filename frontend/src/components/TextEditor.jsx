import "gijgo";
import "gijgo/css/gijgo.min.css";

import React, { useEffect, useRef, useState } from "react";
import { PiUploadSimpleThin } from "react-icons/pi";
import { getText, saveText, updateText } from "../api/api"; // Import the saveText method

const TextEditor = () => {
  const editorRef = useRef(null);
  const [text, setText] = useState(""); // State to store the text content
  const [fetchedText, setFetchedText] = useState("");
  const [textId, setTextId] = useState(null); // State to store the ID of the text being edited

  useEffect(() => {
    if (editorRef.current) {
      // eslint-disable-next-line no-undef
      $(editorRef.current).editor();
      console.log("Editor is initialized. Waiting to retrieve content...");
      // Wait for the editor to be fully initialized
      setTimeout(() => {
        // eslint-disable-next-line no-undef
        const editorBody = $("div[role='wrapper'] > div[role='body']");
        console.log("Editor Body Element:", editorBody.prop("outerHTML"));

        if (editorBody.length > 0) {
          const editorBodyContent = editorBody.text().trim();
          console.log("Content inside Editor Body Tag:", editorBodyContent);
          setText(editorBodyContent);

          // Update editorBodyContent when text changes
          editorBody.on("input", function () {
            // eslint-disable-next-line no-undef
            const updatedContent = $(this).text().trim();
            console.log(
              "Updated content inside Editor Body Tag:",
              updatedContent
            );
            setText(updatedContent);
          });
        } else {
          console.log("Editor body not found or not accessible.");
        }
      }, 1000); // Adjust the timing as needed
    }
  }, [editorRef, text]); // Include text as a dependency to trigger the effect on text changes

  useEffect(() => {
    // FETCH DATA
    const fetchText = async () => {
      try {
        const response = await getText();
        console.log("Response data:", response.data); // Log the entire response data object
        if (response.data && response.data.length > 0) {
          const fetchedText = response.data[0].content; // Access the 'content' property of the first object in the array
          console.log("Fetched text:", fetchedText);
          const fetchedTextId = response.data[0].id;
          console.log("Fetched ID:", fetchedTextId);
          setFetchedText(fetchedText); // Set the fetched text state
          setTextId(fetchedTextId);
          setText(fetchedText);
          if (editorRef.current && fetchedText) {
            // eslint-disable-next-line no-undef
            const editorBody = $("div[role='wrapper'] > div[role='body']");
            editorBody.text(fetchedText); // Set the fetched text in the editor's body
            setText(fetchedText); // Update the local state with the fetched text
          }
        } else {
          console.error("No data found in the response.");
        }
      } catch (error) {
        console.error("Error fetching text:", error);
      }
    };

    fetchText();
  }, []);

  // Handle Text Upload
  const handleUpload = async () => {
    try {
      console.log("Text to be uploaded:", text);
      const response = await saveText(text);
      console.log("Text uploaded successfully:", response.data.message);
    } catch (error) {
      console.error("Error uploading text:", error);
      if (error && error.message) {
        console.error("Error message:", error.message);
      } else {
        console.error(
          "Error object is undefined or does not have a 'message' property."
        );
      }
    }
  };

  const handleEdit = async () => {
    try {
      console.log("Text to be updated:", text);
      if (textId) {
        const response = await updateText(textId, text);
        console.log("Text updated successfully:", response.data.message);
      } else {
        console.error("Text ID is missing.");
      }
    } catch (error) {
      console.error("Error updating text:", error);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Editor */}
      <div ref={editorRef} contentEditable="true"></div>
      {/* Buttons */}
      <div className="flex gap-8">
        {/* Upload button */}
        <button
          type="submit"
          onClick={handleUpload}
          className="flex flex-row items-center justify-center px-3 py-2 space-x-2 text-white transition-all duration-300 bg-secondBlack shadow-lg cursor-pointer group rounded-xl"
        >
          <PiUploadSimpleThin className="w-6 h-6 p-1 text-white transition-transform duration-300 ease-in-out transform group-hover:-translate-y-1" />
          <span className="relative antialiased tracking-normal font-sans text-sm  leading-[1.3]">
            Upload
          </span>
        </button>
        <button
          onClick={handleEdit}
          className="flex flex-row items-center justify-center px-3 py-2 space-x-2 text-white transition-all duration-300 bg-secondBlack shadow-lg cursor-pointer group rounded-xl"
        >
          <span className="relative antialiased tracking-normal font-sans text-sm  leading-[1.3]">
            Edit
          </span>
        </button>
      </div>
    </div>
  );
};

export default TextEditor;
