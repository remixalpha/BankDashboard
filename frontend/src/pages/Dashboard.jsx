import React, { useState } from "react";
import AddItems from "../components/AddItems";
import Sidebar from "../components/Sidebar/Sidebar";
import TableItems from "../components/TableItems";
import TopBar from "../components/TopBar";
import "../styles/Dashboard.css";

import { IoAddOutline } from "react-icons/io5";
import SelectionBox from "../components/SelectionBox";

export default function Dashboard() {
  const [openAddMenu, setOpenAddMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPageSize, setSelectedPageSize] = useState(5);

  // Handle Page Size Change
  const handlePageSizeChange = (value) => {
    console.log("New Page Size:", value);
    setSelectedPageSize(value); // Update the selectedPageSize state
  };

  // Handle Search Query
  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  // Handle Add Button Open
  const handleAddOpen = () => {
    setOpenAddMenu(true);
  };

  return (
    <div className="relative bg-white min-h-screen overflow-hidden ">
      <div className="z-50">
        <TopBar onSearch={handleSearch} />
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
                Employee List
              </p>
            </div>
            <div className="flex flex-row items-center justify-center gap-4 ">
              {/* SelectionBox */}
              <SelectionBox onChange={handlePageSizeChange} />

              {/* Add Button */}
              <button
                type="button"
                onClick={handleAddOpen}
                className=" flex w-full items-center justify-center space-x-2 rounded-lg text-white  bg-clip-border shadow-3xl shadow-shadow-500 bg-secondBlack px-12 py-4 xl:px-4 xl:py-3    delay-200 transition-all duration-300 ease-in-out hover:text-secondBlack hover:bg-lightPrimary hover:scale-110 hover:shadow-lg "
              >
                <IoAddOutline
                  className="h-8 w-8 xl:h-5 xl:w-5"
                  aria-hidden="true"
                />
                <h6 className=" font-sans font-medium text-lg xl:text-sm">
                  Add
                </h6>
              </button>
              <AddItems open={openAddMenu} setOpen={setOpenAddMenu} />
            </div>
          </div>
          {/* Top Part -- End --- */}

          <div className=" hover:scale-100 bg-navy-300/10   rounded-xl  shadow-lg ring-1 ring-black/5  shadow-shadow-500 p-3 mx-4 transition-all duration-300 ease-in-out">
            <TableItems pageSize={selectedPageSize} searchQuery={searchQuery} />
          </div>
        </div>
        {/* main-container -- End --- */}
      </div>
    </div>
  );
}
