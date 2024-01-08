import React from "react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.scss";

import { RiHome5Fill, RiMastercardLine } from "react-icons/ri";
import { FiLayout, FiSettings, FiMenu } from "react-icons/fi";

import Logo from "../../assets/Images/Logo.png";

const sidebarNavItems = [
  {
    display: "Home",
    icon: <RiHome5Fill />,
    to: "/",
    section: "",
  },
  {
    display: "Master",
    icon: <RiMastercardLine />,
    to: "/master",
    section: "master",
  },
  {
    display: "Transactions",
    icon: <FiLayout />,
    to: "/transactions",
    section: "transactions",
  },
  {
    display: "Settings",
    icon: <FiSettings />,
    to: "/settings",
    section: "settings",
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
    setTimeout(() => {
      const sidebarItem = sidebarRef.current.querySelector(
        ".sidebar__menu__item"
      );
      indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
      setStepHeight(sidebarItem.clientHeight);
    }, 50);
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
    if (!isSidebarCollapsed) {
      body.style.paddingLeft = "140px";
    } else {
      body.style.paddingLeft = "350px";
    }
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div
      className={`sidebar ${isSidebarCollapsed ? "collapsed" : ""} bg-slate-50`}
    >
      <div className="flex flex-row relative justify-between items-start ">
        <div
          className={`sidebar__logo ml-8 flex flex-row space-x-4 ${
            isSidebarCollapsed ? "hidden" : ""
          }`}
        >
          <div className="flex-shrink-0  ">
            <img className="h-12 w-12" src={Logo} alt="Your Company" />
          </div>
          <div>
            <h2 className="text-xl font-sans font-bold text-gray-900 ">
              Source Bank
            </h2>
          </div>
        </div>

        <div
          className=" relative text-xl mt-4 p-5 ml-8"
          onClick={toggleSidebar}
        >
          <FiMenu />
        </div>
      </div>

      <div
        ref={sidebarRef}
        className="sidebar__menu md:flex md:flex-col hidden "
      >
        <div
          ref={indicatorRef}
          className="sidebar__menu__indicator bg-indigo-500 "
          style={{
            transform: `translateX(-50%) translateY(${
              activeIndex * stepHeight
            }px)`,
          }}
        ></div>
        {sidebarNavItems.map((item, index) => (
          <Link to={item.to} key={index}>
            <div
              className={`sidebar__menu__item  ${
                activeIndex === index ? "active" : ""
              }`}
            >
              <div
                className={`sidebar__menu__item__icon mr-4 ${
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
