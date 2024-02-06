import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import TopBar from "../components/TopBar";

import TextEditor from "../components/TextEditor";
import "../styles/Dashboard.css";

export default function EmployeeEditor() {
  return (
    <div className="relative bg-white min-h-screen overflow-hidden ">
      <div className="z-50">
        <TopBar />
      </div>

      <div className="z-50">
        <Sidebar />
      </div>

      <div className=" main-container mt-6 rounded-3xl xl:p-8 p-2">
        {/* main-container -- Start --- */}
        <div className="  flex flex-col space-y-8 mt-4 xl:mt-2  p-8 relative rounded-xl backdrop-blur-xl bg-white/30 shadow-lg ring-1 ring-black/5  bg-clip-border z-40">
          {/* Top Part -- Start --- */}
          <div className="top-part p-2 flex flex-row justify-between  rounded-xl">
            {/* Title */}
            <div>
              <p className="text-gray-400">Page</p>
              <p className="text-3xl font-extrabold tracking-tight text-slate-900">
                Write Something ..
              </p>
            </div>
          </div>
          {/* Top Part -- End --- */}
          <div className="flex gap-36">
            {/* <UploadForm /> */}
            <TextEditor />
          </div>
        </div>

        {/* main-container -- End --- */}
      </div>
    </div>
  );
}
