import React, { Fragment, useRef, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { FaEllipsisV } from "react-icons/fa";

import { XMarkIcon } from "@heroicons/react/24/outline";

import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";

import { Combobox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const option = [
  { id: 1, name: "fa-adn" },
  { id: 2, name: "fa-adjust" },
];
const data = [
  {
    id: 1,
    name: "Master",
    icons: ["fa-adn"],
  },
  {
    id: 2,
    name: "Transactions",
    icons: ["fa-adjust"],
  },
];

export default function MenuItems() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(option[0]);
  const [query, setQuery] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const cancelButtonRef = useRef(null);

  const handleAdd = () => {
    console.log("added !");
    setOpen(true);
  };
  const handleDelete = () => {
    console.log("Deleted !");
    setOpenDelete(true);
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const filteredOption =
    query === ""
      ? option
      : option.filter((person) =>
          option.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <>
      <div className="container mx-auto ">
        <table className="min-w-full bg-white relative ">
          <thead>
            <tr className="rounded-xl text-navy-700 relative justify-start text-lg mb-12 bg-indigo-100">
              <th className="py-2 px-8 font-medium text-start border-r-2 border-white ">
                Menu Name
              </th>
              <th className="py-2 px-8 font-medium text-start  ">Font Icon</th>
              <th className="py-2 px-8 font-medium text-start "></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr
                className="main rounded-xl border border-b-gray-200 gap-8 relative  hover:bg-slate-100 hover:text-slate-800 cursor-pointer"
                key={item.id}
              >
                <td className="px-8 py-2 font-normal">{item.name}</td>
                <td className="px-8 py-2 font-normal relative">
                  {item.icons.map((icon, index) => (
                    <span
                      key={index}
                      className={`inline-block px-2 py-1 rounded-lg ${
                        icon.length > 5 ? "bg-indigo-500" : "bg-green-500"
                      } text-white`}
                    >
                      {icon}
                    </span>
                  ))}
                </td>
                <td>
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button>
                        <FaEllipsisV className="hidden md:flex ml-[6rem] text-gray-800 cursor-pointer z-40" />
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
                      <Menu.Items className="absolute right-[16rem] z-10 mt-4  w-40 origin-top-right rounded-lg bg-white py-1 shadow-lg ">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={handleAdd}
                              className={classNames(
                                active
                                  ? "bg-indigo-500 text-white scale-110 shadow-xl rounded-lg"
                                  : "",
                                "flex flex-row justify-start items-center px-8 w-ful  mx-2 my-2 rounded-lg text-sm text-slate-700 transition-all duration-300 ease-in-out"
                              )}
                            >
                              <CiEdit className="h-5 w-5" aria-hidden="true" />
                              <h1 className="px-4 py-2">Edit </h1>
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={handleDelete}
                              className={classNames(
                                active
                                  ? "bg-indigo-500 text-white scale-110 shadow-xl rounded-lg"
                                  : "",
                                "flex flex-row justify-start items-center px-6  mx-2 my-2  text-sm text-slate-700 transition-all duration-300 ease-in-out"
                              )}
                            >
                              <MdOutlineDelete
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                              <h1 className="px-4 py-2">Delete</h1>
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Edit */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 hidden backdrop-blur-sm bg-gray-500 bg-opacity-75 transition-opacity md:block" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen  overflow-y-auto">
            <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                enterTo="opacity-100 translate-y-0 md:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 md:scale-100"
                leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              >
                <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-2xl">
                  <div className="relative flex w-full items-start overflow-hidden bg-white rounded-primary  pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8 overflow-visible">
                    <button
                      type="button"
                      className="absolute right-4 top-4 text-gray-800 hover:text-gray-500 cursor-pointer z-50 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    <div className="w-full items-center justify-center relative mx-12  sm:grid-cols-12 lg:gap-x-8">
                      <div className="sm:col-span-8 ">
                        <h2 className="text-3xl font-sans font-bold text-gray-900 sm:pr-12">
                          Edit menu
                        </h2>

                        <section
                          aria-labelledby="options-heading"
                          className="mt-10"
                        >
                          <form>
                            <div className="space-y-8">
                              <div className="">
                                <label
                                  htmlFor="menuName"
                                  className="block text-md font-normal font-sans leading-6 text-slate-900"
                                >
                                  Menu Name
                                </label>
                                <div className="mt-2">
                                  <input
                                    id="menuName"
                                    name="menuName"
                                    type="text"
                                    className="block w-full pl-6 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-indigo-200  placeholder:text-gray-400   sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>

                              {/* Combobox */}
                              <div className=" top-16 w-72 md:w-[30rem]">
                                <Combobox
                                  value={selected}
                                  onChange={setSelected}
                                >
                                  <div className="relative mt-1">
                                    <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white ring-1 ring-indigo-200 text-left shadow-sm  sm:text-sm">
                                      <Combobox.Input
                                        className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                                        displayValue={(option) => option.name}
                                        onChange={(event) =>
                                          setQuery(event.target.value)
                                        }
                                      />
                                      <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                        <ChevronUpDownIcon
                                          className="h-5 w-5 text-gray-400"
                                          aria-hidden="true"
                                        />
                                      </Combobox.Button>
                                    </div>
                                    <Transition
                                      as={Fragment}
                                      leave="transition ease-in duration-100"
                                      leaveFrom="opacity-100"
                                      leaveTo="opacity-0"
                                      afterLeave={() => setQuery("")}
                                    >
                                      <Combobox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                        {filteredOption.length === 0 &&
                                        query !== "" ? (
                                          <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                                            Nothing found.
                                          </div>
                                        ) : (
                                          filteredOption.map((option) => (
                                            <Combobox.Option
                                              key={option.id}
                                              className={({ active }) =>
                                                `relative cursor-default select-none py-2 pl-10 pr-4 overflow-hidden  ${
                                                  active
                                                    ? "bg-indigo-500 text-white mx-2 rounded-lg shadow-lg scale-100 transition-all duration-300 ease-in-out "
                                                    : "text-gray-900 cursor-pointer"
                                                }`
                                              }
                                              value={option}
                                            >
                                              {({ selected, active }) => (
                                                <>
                                                  <span
                                                    className={`block truncate ${
                                                      selected
                                                        ? "font-medium"
                                                        : "font-normal"
                                                    }`}
                                                  >
                                                    {option.name}
                                                  </span>
                                                  {selected ? (
                                                    <span
                                                      className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                        active
                                                          ? "text-white"
                                                          : "text-indigo-500"
                                                      }`}
                                                    >
                                                      <CheckIcon
                                                        className="h-5 w-5"
                                                        aria-hidden="true"
                                                      />
                                                    </span>
                                                  ) : null}
                                                </>
                                              )}
                                            </Combobox.Option>
                                          ))
                                        )}
                                      </Combobox.Options>
                                    </Transition>
                                  </div>
                                </Combobox>
                              </div>
                            </div>
                            <div className="flex flex-row justify-end space-x-2 relative mt-4 ">
                              <button
                                type="submit"
                                className="mt-6 flex w-32 items-center justify-center rounded-2xl  bg-indigo-500 px-2 py-2 text-base font-medium text-white hover:bg-indigo-700 hover:scale-110 hover:shadow-lg transition-all duration-300 ease-in-out"
                              >
                                Update
                              </button>

                              <button
                                type="submit"
                                className="mt-6 flex w-24 items-center justify-center rounded-xl border border-slate-800  py-3 text-base font-medium text-slate-800 hover:scale-110 hover:shadow-lg transition-all duration-300 ease-in-out"
                              >
                                Close
                              </button>
                            </div>
                          </form>
                        </section>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Delete */}
      <Transition.Root show={openDelete} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpenDelete}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-primary bg-white text-left shadow-lg transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-8 sm:pb-12">
                    <div className="sm:flex  sm:items-start">
                      <div className="mx-auto flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-14 sm:w-14">
                        <ExclamationTriangleIcon
                          className="h-8 w-8 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3  text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-2xl mr-12 font-semibold leading-8 text-gray-900"
                        >
                          Are you sure do you want to delete this ?
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-md text-gray-500">
                            This action will delete the record. Do you want to
                            continue ?
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-50 px-4 py-8 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-300 ease-in-out hover:scale-110  hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={() => setOpenDelete(false)}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-lg transition-all duration-300 ease-in-out hover:scale-110 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpenDelete(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
