import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { BsPerson } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { PiSignOut } from "react-icons/pi";
import { RiHome5Fill, RiMastercardLine } from "react-icons/ri";
import { FiLayout, FiSettings } from "react-icons/fi";
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

export default function Header() {
  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-white">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-end">
                  {/* Options -- Start-- */}
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="relative flex rounded-full bg-slate-200 text-sm mt-4 ">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-12 w-12 rounded-full object-cover"
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
                          <Menu.Items className="absolute right-0 z-10 mt-8 w-48 origin-top-right rounded-2xl py-4 px-2  bg-white shadow-lg ">
                            <Menu.Item>
                              {({ active }) => (
                                <div
                                  className={classNames(
                                    active
                                      ? "bg-indigo-500 text-white scale-110 shadow-xl rounded-lg"
                                      : "",
                                    "flex flex-row justify-start items-center px-4  mx-2 my-2  text-sm text-slate-700 transition-all duration-300 ease-in-out"
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
                                      ? "bg-indigo-500 text-white scale-110 shadow-xl rounded-lg"
                                      : "",
                                    "flex flex-row justify-start items-center px-4  mx-2 my-2  text-sm text-slate-700 transition-all duration-300 ease-in-out"
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
                                      ? "bg-indigo-500 text-white scale-110 shadow-xl rounded-lg"
                                      : "",
                                    "flex flex-row justify-start items-center px-4  mx-2 my-2  text-sm text-slate-700 transition-all duration-300 ease-in-out"
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
