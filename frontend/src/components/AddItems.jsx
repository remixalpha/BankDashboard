import { Fragment, useEffect, useState } from "react";
// Component
import { Dialog, Transition } from "@headlessui/react";
import { Callout } from "@radix-ui/themes";
// Icons
import { CheckIcon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { BiImageAdd } from "react-icons/bi";
import { LuPencil } from "react-icons/lu";
import { PiUploadSimpleThin, PiXLight } from "react-icons/pi";

// Api
import { addData, fetchEmployeeData } from "../api/api";

export default function AddItems({ open, setOpen }) {
  // Api
  const [Data, setData] = useState([]);
  //   InputField selection
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [PhoneNo, setPhoneNo] = useState("");
  const [Gender, setGender] = useState("");
  //
  const [image, setImage] = useState("https://via.placeholder.com/150");
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [fileInputKey, setFileInputKey] = useState(0);

  // For Message Display
  const [showMessage, setShowMessage] = useState(false);
  const [isMessageShown, setIsMessageShown] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Image Change
  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];

    if (selectedImage) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedImage);

      reader.onload = () => {
        setImage(reader.result);
        setIsImageUploaded(true);
      };
    }
  };

  // Api

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneNoChange = (event) => {
    setPhoneNo(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  // Handle Adding Data
  const handleAdd = async (event) => {
    event.preventDefault();
    try {
      const newData = {
        name: Name,
        email: Email,
        phoneNumber: PhoneNo,
        gender: Gender,
      };

      console.log("Data:", newData);
      const response = await addData(newData);
      console.log("Response data:", response.result);

      if (response.result === "SUCCESS") {
        setIsSuccess(true);
        setMessage("Employee added successfully!");
      } else {
        setIsSuccess(false);
        setMessage("Something went wrong");
      }

      const updatedData = await fetchEmployeeData();
      setData(updatedData);
    } catch (error) {
      console.error("Error adding Employee:", error);
      setIsSuccess(false);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setShowMessage(true);
      setOpen(false);
      setIsMessageShown(true);
      // Hide the message after a certain duration if needed
      setTimeout(() => {
        setShowMessage(false);
        setIsMessageShown(false);
      }, 5000);
      // Reset to the default
      setName("");
      setEmail("");
      setPhoneNo("");
      setGender("");
      // Reset other form fields as needed
      setFileInputKey((prevKey) => prevKey + 1);
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
        <div className="absolute bottom-[25rem] right-[10rem] flex justify-center items-center scale-110 h-full w-full">
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

      {/* Add */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setShowMessage(false)}
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
                <Dialog.Panel className="flex w-full h-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-6xl">
                  <div className="relative flex w-full min-h-[40rem] items-start overflow-hidden rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500  pb-8 pt-14  sm:px-6 sm:pt-8 md:p-6 lg:p-8 ">
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
                        <p className="text-3xl font-bold antialiased tracking-tight text-slate-900">
                          Add New Employee
                        </p>
                        <section
                          aria-labelledby="options-heading"
                          className="mt-10"
                        >
                          <form onSubmit={handleAdd}>
                            <div className="grid items-center grid-cols-1 gap-y-8">
                              {/* Image Upload */}
                              <div className="flex justify-center cursor-pointer col-2">
                                <div className="relative inline-block">
                                  <input
                                    id="fileInput"
                                    name="fileUrl"
                                    type="file"
                                    key={fileInputKey}
                                    className="sr-only"
                                    onChange={(event) => {
                                      handleImageChange(event);
                                      setFileInputKey((prevKey) => prevKey + 1);
                                    }}
                                  />
                                  <label
                                    htmlFor="fileInput"
                                    className="relative flex items-center justify-center border-2 border-gray-400 border-dashed cursor-pointer w-52 h-52 rounded-full"
                                  >
                                    {isImageUploaded ? (
                                      <img
                                        className="object-cover w-full h-full rounded-full"
                                        alt="Uploaded"
                                        src={image}
                                      />
                                    ) : (
                                      <div className="flex flex-col items-center">
                                        <BiImageAdd
                                          className="w-12 mb-2 text-gray-800 h-12 "
                                          alt="Placeholder"
                                        />
                                        <span className="text-gray-500">
                                          Upload an image
                                        </span>
                                      </div>
                                    )}
                                  </label>
                                  <label
                                    htmlFor="fileInput"
                                    className="absolute p-2 bg-white border shadow-lg cursor-pointer border-e-white bottom-4  -right-4 rounded-xl"
                                  >
                                    <div className="flex flex-col justify-end ">
                                      <LuPencil
                                        className="w-6 h-6 p-1 text-black "
                                        aria-hidden="true"
                                      />
                                    </div>
                                  </label>
                                </div>
                              </div>

                              <div className="space-y-10 bg-white rounded-xl p-6">
                                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                  {/* Name */}
                                  <div className="sm:col-span-3">
                                    <label
                                      htmlFor="name"
                                      className="block mb-4 text-sm text-gray-900"
                                    >
                                      Name
                                    </label>
                                    <input
                                      type="text"
                                      id="name"
                                      name="name"
                                      value={Name}
                                      onChange={handleNameChange}
                                      className="block w-full px-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                    />
                                  </div>

                                  {/* Email */}
                                  <div className="sm:col-span-3">
                                    <label
                                      htmlFor="email"
                                      className="block mb-4 text-sm text-gray-900"
                                    >
                                      Email
                                    </label>
                                    <input
                                      type="email"
                                      id="email"
                                      name="email"
                                      value={Email}
                                      onChange={handleEmailChange}
                                      className="block w-full px-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                    />
                                  </div>
                                </div>
                                {/* Phone No */}
                                <div>
                                  <label
                                    htmlFor="phoneNo"
                                    className="block mb-4 text-sm text-gray-900"
                                  >
                                    Phone No
                                  </label>
                                  <input
                                    type="text"
                                    id="phoneNo"
                                    name="phoneNo"
                                    value={PhoneNo}
                                    onChange={handlePhoneNoChange}
                                    className="block w-full px-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                  />
                                </div>

                                {/* Gender */}
                                <fieldset>
                                  <legend className="block mb-4 text-sm text-gray-900">
                                    Gender
                                  </legend>
                                  <div className="flex flex-row justify-start space-x-8">
                                    <div className="flex items-center gap-x-3">
                                      <input
                                        id="female"
                                        name="gender"
                                        type="radio"
                                        value="female"
                                        checked={Gender === "female"}
                                        onChange={handleGenderChange}
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                      />
                                      <label
                                        htmlFor="female"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                      >
                                        Female
                                      </label>
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                      <input
                                        id="male"
                                        name="gender"
                                        type="radio"
                                        value="male"
                                        checked={Gender === "male"}
                                        onChange={handleGenderChange}
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                      />
                                      <label
                                        htmlFor="male"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                      >
                                        Male
                                      </label>
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                      <input
                                        id="transgender"
                                        name="gender"
                                        type="radio"
                                        value="transgender"
                                        checked={Gender === "transgender"}
                                        onChange={handleGenderChange}
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                      />
                                      <label
                                        htmlFor="transgender"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                      >
                                        Transgender
                                      </label>
                                    </div>
                                  </div>
                                </fieldset>

                                {/* Buttons */}
                                <div className="flex items-center justify-end gap-x-6 relative  ">
                                  {/* Cancel button */}
                                  <button
                                    type="reset"
                                    className="flex flex-row items-center justify-center px-3 py-2 space-x-2 text-white transition-all duration-300 bg-secondBlack shadow-lg cursor-pointer group rounded-xl"
                                  >
                                    <PiXLight className="w-6 h-6 p-1 text-white transition-transform duration-300 ease-in-out transform group-hover:-translate-y-1" />
                                    <span className="relative antialiased tracking-normal font-sans text-sm leading-[1.3]">
                                      Cancel
                                    </span>
                                  </button>

                                  {/* Upload button */}
                                  <button
                                    type="submit"
                                    className="flex flex-row items-center justify-center px-3 py-2 space-x-2 text-white transition-all duration-300 bg-secondBlack shadow-lg cursor-pointer group rounded-xl"
                                  >
                                    <PiUploadSimpleThin className="w-6 h-6 p-1 text-white transition-transform duration-300 ease-in-out transform group-hover:-translate-y-1" />
                                    <span className="relative antialiased tracking-normal font-sans text-sm  leading-[1.3]">
                                      Save
                                    </span>
                                  </button>
                                </div>
                              </div>
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
