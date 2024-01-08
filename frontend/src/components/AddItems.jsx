import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { IoAddOutline } from "react-icons/io5";
import { Combobox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const option = [
  { id: 1, name: "fa-adn" },
  { id: 2, name: "fa-adjust" },
];

export default function AddItems() {
  const [open, setOpen] = useState(false);

  const handleAdd = () => {
    console.log("added !");
    setOpen(true);
  };

  const [selected, setSelected] = useState(option[0]);
  const [query, setQuery] = useState("");

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
      <button
        type="button"
        onClick={handleAdd}
        className=" flex w-full items-center justify-center space-x-2 rounded-2xl bg-indigo-500 px-12 py-4 xl:px-4 xl:py-3 xl:mb-3   delay-200 transition-all duration-300 ease-in-out text-white hover:bg-indigo-700 hover:scale-110 hover:shadow-lg hover:border-indigo-700"
      >
        <IoAddOutline className="h-8 w-8 xl:h-5 xl:w-5" aria-hidden="true" />
        <h6 className=" font-sans font-medium text-lg xl:text-sm">Add</h6>
      </button>
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
                          Menu Creation
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
                                Save
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
    </>
  );
}
