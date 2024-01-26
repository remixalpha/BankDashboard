import { Dialog, Transition } from "@headlessui/react";
import { Table } from "@radix-ui/themes";
import React, { Fragment, useEffect, useRef, useState } from "react";
import defaultProfileImage from "../assets/Images/Person.png";
import DropDown from "./DropDown";
// Icon
import {
  ExclamationTriangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Pagination } from "antd";
// Icons
import { BiImageAdd } from "react-icons/bi";
import { LuPencil } from "react-icons/lu";
import { PiUploadSimpleThin, PiXLight } from "react-icons/pi";

// Api
import {
  deleteData,
  fetchEmployeeData,
  fetchEmployeeDataWithLimit,
  updateData,
} from "../api/api";

export default function TableItems({ pageSize, searchQuery }) {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [empIdToDelete, setEmpIdToDelete] = useState(null);
  const [empIdToUpdate, setEmpIdToUpdate] = useState(null);
  const cancelButtonRef = useRef(null);
  // Api
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [data, setData] = useState([]);
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
  const [showMessage, setShowMessage] = useState(true);
  const [isMessageShown, setIsMessageShown] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const onChange = (page) => {
    setCurrentPage(page);
  };

  const handleEditMenuOpen = (employee) => {
    console.log("Selected Employee For Updating:", employee);
    setEmpIdToUpdate(employee);
    setOpen(true);
  };

  const handleDeleteMenuOpen = (employee) => {
    console.log("Selected Employee ID For Deleting:", employee.empId);
    setEmpIdToDelete(employee.empId);
    setOpenDelete(true);
  };

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

  // API Part

  useEffect(() => {
    // Fetch Data
    const fetchData = async () => {
      try {
        const data = await fetchEmployeeDataWithLimit(
          currentPage,
          pageSize,
          searchQuery
        );
        setData(data.data);
        setTotalCount(data.totalCount);
        console.log("Data fetched successfully:", data);
      } catch (error) {
        console.error("Error fetching Employee Data:", error);
      }
    };

    // Call the fetchData function
    fetchData();
    console.log("Data fetched To Populate :", empIdToUpdate);
    // Populate input fields when empIdToUpdate changes
    if (empIdToUpdate) {
      setName(empIdToUpdate.name || "");
      setEmail(empIdToUpdate.email || "");
      setPhoneNo(empIdToUpdate.phoneNumber || "");
      setGender(empIdToUpdate.gender || "");
      // Assuming there's an image property in empIdToUpdate, update accordingly
      setImage(empIdToUpdate.image || "https://via.placeholder.com/150");
    }
  }, [currentPage, pageSize, searchQuery, empIdToUpdate]);

  const handleDelete = async (employeeId) => {
    try {
      console.log("Deleting employee with ID:", employeeId);

      const response = await deleteData(employeeId);

      console.log("Response data:", response);

      if (response.status === "SUCCESS") {
        setIsSuccess(true);
        setMessage(response.message || "Employee Deleted successfully!");
      } else {
        setIsSuccess(false);
        setMessage(response.message || "Something went wrong");
      }

      const updatedData = await fetchEmployeeDataWithLimit(
        currentPage,
        pageSize,
        searchQuery
      );
      setData(updatedData.data);
      setTotalCount(updatedData.totalCount);
    } catch (error) {
      console.error("Error while Deleting employee:", error);
      setIsSuccess(false);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setShowMessage(true);
      setOpenDelete(false);
      setEmpIdToDelete(null);
      setIsMessageShown(true);

      // Hide the message after a certain duration if needed
      setTimeout(() => {
        setShowMessage(false);
        setIsMessageShown(false);
      }, 5000);
    }
  };

  const handleUpdate = async () => {
    try {
      console.log("Updated employee with ID:", empIdToUpdate.empId);

      const updatedEmployeeData = {
        name: Name,
        email: Email,
        phoneNumber: PhoneNo,
        gender: Gender,
      };

      const response = await updateData(empIdToUpdate, updatedEmployeeData);
      const updatedData = await fetchEmployeeData();

      console.log("Response data:", response);
      if (response.status === "SUCCESS") {
        setIsSuccess(true);
        setMessage(response.message || "Employee Updated successfully!");
      } else {
        setIsSuccess(false);
        setMessage(response.message || "Something went wrong");
      }

      setData(updatedData.data);
      setTotalCount(updatedData.totalCount);
    } catch (error) {
      console.error("Error updating menu:", error);
    } finally {
      setShowMessage(true);
      setOpen(false);
      setEmpIdToUpdate(null);
      setIsMessageShown(true);

      // Hide the message after a certain duration if needed
      setTimeout(() => {
        setShowMessage(false);
        setIsMessageShown(false);
      }, 5000);
    }
  };

  return (
    <>
      <div className="container mx-auto space-y-4">
        <div className="">
          <Table.Root variant="ghost">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Image</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Phone No</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Gender</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell> </Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body className="relative font-poppins ">
              {data.map((employee) => (
                <Table.Row
                  className="hover:bg-gray-50  cursor-pointer"
                  key={employee.empId}
                >
                  <Table.Cell className="">
                    {/* Render the image based on employee's name */}
                    <img
                      src={`path-to-your-upload-folder/${employee.empName}.jpg`} // Replace with the correct path and file extension
                      alt={employee.empName}
                      onError={(e) => {
                        // Handle image not found by displaying a default image
                        e.target.src = defaultProfileImage;
                      }}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </Table.Cell>
                  <Table.Cell className="">{employee.empName}</Table.Cell>
                  <Table.Cell className="">{employee.empEmail}</Table.Cell>
                  <Table.Cell className="">{employee.empPhoneNo}</Table.Cell>
                  <Table.Cell className="">{employee.EmpGender}</Table.Cell>
                  <Table.Cell>
                    <DropDown
                      onEdit={handleEditMenuOpen}
                      onDelete={handleDeleteMenuOpen}
                      employeeId={employee.empId}
                      employee={employee}
                    />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </div>
      </div>
      <div className="mt-4 items-end justify-end flex">
        <Pagination
          current={currentPage}
          onChange={onChange}
          pageSize={pageSize}
          total={totalCount}
        />
      </div>
      {/* Edit */}
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
                          Edit Employee
                        </p>
                        <section
                          aria-labelledby="options-heading"
                          className="mt-10"
                        >
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              handleUpdate();
                            }}
                          >
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
                                    onClick={() => {
                                      setOpen(false);
                                      setEmpIdToUpdate(null);
                                    }}
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
                                      Update
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-lg transition-all sm:my-8 sm:w-full sm:max-w-lg">
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
                      type="submit"
                      className="inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-300 ease-in-out hover:scale-110  hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={() => handleDelete(empIdToDelete)}
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
