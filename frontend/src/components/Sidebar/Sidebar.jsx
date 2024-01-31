import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.scss";

import { FiLayout, FiSettings } from "react-icons/fi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdOutlineHorizontalRule } from "react-icons/md";
import { RiHome5Fill, RiMastercardLine } from "react-icons/ri";
import Logo from "../../assets/Images/Logo-remove.png";

const sidebarNavItems = [
  {
    display: "Dashboard",
    icon: <RiHome5Fill />,
    to: "/",
    section: "Dashboard",
  },
  {
    display: "Employee Directory",
    icon: <RiMastercardLine />,
    to: "",
    section: "Employee",
  },
  {
    display: "Attendance",
    icon: <FiLayout />,
    to: "",
    section: "Attendance",
  },
  {
    display: "Leave Management",
    icon: <FiSettings />,
    to: "",
    section: "Leave",
  },
];

export default function Sidebar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [stepHeight, setStepHeight] = useState(0);
  const sidebarRef = useRef();
  const indicatorRef = useRef();
  const location = useLocation();

  useEffect(() => {
    const setIndicatorHeight = () => {
      const sidebarItem = sidebarRef.current.querySelector(
        ".sidebar__menu__item"
      );

      if (sidebarItem) {
        indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
        setStepHeight(sidebarItem.clientHeight);
      }
    };

    // Call the function once on mount
    setIndicatorHeight();

    // Call the function on window resize
    window.addEventListener("resize", setIndicatorHeight);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", setIndicatorHeight);
    };
  }, []);

  useEffect(() => {
    const curPath = window.location.pathname.split("/")[1];
    const activeItem = sidebarNavItems.findIndex(
      (item) => item.section === curPath
    );
    setActiveIndex(curPath.length === 0 ? 0 : activeItem);
  }, [location]);

  const toggleSidebar = () => {
    const body = document.body;
    body.style.paddingLeft = isSidebarCollapsed ? "350px" : "140px";
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div
      className={`sidebar ${
        isSidebarCollapsed ? "collapsed" : ""
      } bg-slate-50  `}
    >
      <div className="flex flex-row relative justify-between items-start  ">
        {/* Logo -- Start */}
        <div className="sidebar__logo ml-8 relative  flex flex-row space-x-2 ">
          <div className="flex-shrink-0  ">
            <img
              className={`ml-2 h-8 w-8 ${isSidebarCollapsed ? "" : ""}`}
              src={Logo}
              alt="Your Company"
            />
          </div>
          <div>
            <h2
              className={`text-lg font-poppins font-semibold text-lightPrimary ${
                isSidebarCollapsed ? "hidden" : ""
              }`}
            >
              Staff Pulse
            </h2>
          </div>
        </div>
        {/* Logo -- end */}

        {/* Arrow -- start */}
        <div
          className="relative text-2xl mt-4 p-5 -right-12 top-80 group transition-all duration-300 ease-in-out cursor-pointer "
          onClick={toggleSidebar}
        >
          <div className="absolute group-hover:opacity-0 scale-105 bg-white rotate-90 transition-all duration-300 ease-in-out">
            <MdOutlineHorizontalRule />
          </div>
          <div className="group-hover:opacity-100 transition-all duration-300 ease-in-out">
            {isSidebarCollapsed ? <IoIosArrowForward /> : <IoIosArrowBack />}
          </div>
        </div>

        {/* Arrow -- end */}
      </div>

      <p className="ml-5 mt-8 text-sm text-gray-400">Dashboard</p>
      <div
        ref={sidebarRef}
        className="sidebar__menu mt-5 md:flex md:flex-col hidden "
      >
        {/* Indicator */}
        <div
          ref={indicatorRef}
          className="sidebar__menu__indicator  bg-thirdBlack"
          style={{
            transform: `translateX(-55%) translateY(${
              activeIndex * stepHeight
            }px)`,
          }}
        />

        {sidebarNavItems.map((item, index) => (
          <Link to={item.to} key={index}>
            <div
              className={`sidebar__menu__item ml-2 ${
                activeIndex === index ? "active" : ""
              }`}
            >
              <div
                className={`sidebar__menu__item__icon  ${
                  isSidebarCollapsed ? "" : ""
                }`}
              >
                {item.icon}
              </div>
              <div
                className={`sidebar__menu__item__text ${
                  isSidebarCollapsed ? "hidden" : ""
                }`}
              >
                {item.display}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
