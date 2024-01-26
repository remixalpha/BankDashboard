import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { Fragment, useState } from "react";
import { BsPerson } from "react-icons/bs";
import { FiLayout, FiSearch, FiSettings } from "react-icons/fi";

import { IoSettingsOutline } from "react-icons/io5";
import { PiSignOut } from "react-icons/pi";
import { RiHome5Fill, RiMastercardLine } from "react-icons/ri";
import Person from "../assets/Images/Person.png";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const navigation = [
  {
    name: "Home",
    icon: <RiHome5Fill />,
    href: "/",
    current: true,
  },
  {
    name: "Master",
    icon: <RiMastercardLine />,
    href: "/master",
    current: false,
  },
  {
    name: "Transactions",
    icon: <FiLayout />,
    href: "/transitions",
    current: false,
  },
  {
    name: "Settings",
    icon: <FiSettings />,
    href: "/settings",
    current: false,
  },
];

export default function TopBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
    // Log the searchQuery value for debugging purposes
    console.log("Search query:", value);

    // Call the onSearch prop to notify the parent component about the search query change
    onSearch(value);
  };

  return (
    <>
      <div className=" min-h-full">
        <Disclosure as="nav" className=" bg-white mt-3 rounded-2xl  pb-4 mr-6">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-end">
                  {/* Options -- Start-- */}
                  <div className="hidden md:flex justify-center items-center">
                    {/* Search */}
                    <div className="relative mt-[3px] flex h-[61px] w-[300px] flex-grow items-center justify-around gap-2 rounded-full  px-2 py-2 md:w-[365px] md:flex-grow-0 md:gap-1 xl:w-[320px] xl:gap-2">
                      <div className="flex h-full items-center rounded-full border text-navy-700 pl-4 transition-transform transform z-10 ">
                        <p className="text-xl rounded-full px-2 py-2 cursor-pointer z-30">
                          <FiSearch className="h-5 w-5 text-secondBlack " />
                        </p>
                        <input
                          type="text"
                          placeholder="Search..."
                          value={searchQuery}
                          onChange={handleSearchChange}
                          className="block h-full rounded-full  text-sm font-normal text-secondBlack outline-none placeholder:!text-gray-400 sm:w-fit"
                        />
                      </div>
                    </div>
                    <div className="ml-4 flex items-center md:ml-6">
                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="relative flex rounded-full bg-slate-200 text-sm  ">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>

                            <img
                              className="h-12 w-12 rounded-full object-cover shadow-xl shadow-shadow-500 "
                              src={Person}
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute  right-0 z-50 mt-8 w-64 origin-top-right rounded-2xl py-4 px-2  bg-secondBlack shadow-lg ">
                            <Menu.Item>
                              <div className="nav-item  top-16 bg-secondBlack pt-2 rounded-lg ">
                                <div className="flex flex-col text-center  items-center justify-center gap-5  border-color border-b-1 pb-6">
                                  <img
                                    className=" object-cover rounded-full h-24 w-24"
                                    src={Person}
                                    alt="user-profile"
                                  />
                                  <div>
                                    <p className="font-semibold text-white text-xl">
                                      Micheal Robert
                                    </p>
                                    <p className="text-gray-500 text-sm">
                                      Administrator
                                    </p>
                                    <p className="text-gray-500 text-sm">
                                      info@source.com
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Menu.Item>

                            {/* Manus */}
                            <Menu.Item>
                              {({ active }) => (
                                <div
                                  className={classNames(
                                    active
                                      ? "bg-white text-secondBlack scale-110 shadow-xl rounded-lg"
                                      : "",
                                    "flex flex-row justify-start items-center px-4  mx-4 my-2  text-sm text-lightPrimary  rounded-lg transition-all duration-300 ease-in-out"
                                  )}
                                >
                                  <BsPerson
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                  <a href="/profile" className="px-4 py-2">
                                    Your Profile
                                  </a>
                                </div>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <div
                                  className={classNames(
                                    active
                                      ? "bg-white text-secondBlack scale-110 shadow-xl rounded-lg"
                                      : "",
                                    "flex flex-row justify-start items-center px-4  mx-4 my-2  text-sm text-lightPrimary  rounded-lg transition-all duration-300 ease-in-out"
                                  )}
                                >
                                  <IoSettingsOutline
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                  <a href="/settings" className="px-4 py-2">
                                    Settings
                                  </a>
                                </div>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <div
                                  className={classNames(
                                    active
                                      ? "bg-white text-secondBlack scale-110 shadow-xl rounded-lg"
                                      : "",
                                    "flex flex-row justify-start items-center px-4  mx-4 my-2  text-sm text-lightPrimary  rounded-lg transition-all duration-300 ease-in-out"
                                  )}
                                >
                                  <PiSignOut
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                  <a href="/signout" className="px-4 py-2">
                                    Sign Out{" "}
                                  </a>
                                </div>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  {/* Options -- End -- */}

                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md  p-2 text-slate-800  hover:text-slate-800 ">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>
              <Disclosure.Panel className="md:hidden mb-80">
                <div className="space-y-1 mx-8 mt-64 px-2 pb-8 pt-8 rounded-xl shadow-lg ">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-indigo-500 text-white "
                          : "text-slate-900 hover:bg-indigo-500 hover:text-white",
                        " rounded-md px-3 py-2 text-base font-medium flex flex-row relative text-start items-center space-x-4"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      <span>{item.icon}</span>
                      <h1>{item.name}</h1>
                    </Disclosure.Button>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </>
  );
}
