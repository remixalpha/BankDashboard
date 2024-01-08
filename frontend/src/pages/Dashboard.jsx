import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header";
import MenuItems from "../components/MenuItems";
import AddItems from "../components/AddItems";
import { CiSearch } from "react-icons/ci";

export default function Dashboard() {
  return (
    <div className="relative bg-white min-h-screen overflow-hidden ">
      <div className=" z-50">
        <Header />
      </div>

      <div className="z-0">
        <Sidebar />
      </div>
      <div className=" mt-6 rounded-3xl bg-slate-50 xl:p-12 p-2">
        <div className="flex flex-col space-y-12 mt-4 xl:mt-8 bg-white p-8 rounded-3xl shadow-lg">
          <div className=" flex flex-col space-y-12 xl:flex xl:flex-row xl:mx-6 relative justify-between">
            <h1 className="text-3xl text-justify pl-4 font-sans font-bold tracking-tight text-navy-700 sm:mt-10 sm:text-5xl">
              Menu List
            </h1>
            <div className="flex flex-col xl:flex xl:flex-row relative justify-center items-center space-y-4 xl:space-x-8">
              {/* Search */}
              <div>
                <label class="relative block">
                  <span class="sr-only">Search</span>
                  <span class="absolute inset-y-0 left-0 flex items-center pl-4">
                    <CiSearch className="h-6 w-6 " aria-hidden="true" />
                  </span>
                  <input
                    class=" placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-xl py-2 pl-12 pr-3  focus:outline-none focus:border-indigo-700 focus:ring-indigo-700 focus:ring-1 sm:text-sm"
                    placeholder="Search.."
                    type="text"
                    name="search"
                  />
                </label>
              </div>
              <div>
                <AddItems />
              </div>
            </div>
          </div>
          <div className=" xl:pb-[10rem] rounded-xl">
            <MenuItems />
          </div>
        </div>
      </div>
    </div>
  );
}
