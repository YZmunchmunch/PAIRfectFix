import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
export const SidebarData = [
  {
    title: "Profile",
    path: "/home",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Forum",
    path: "/forum",
    icon: <IoIcons.IoIosPaper/>,
    cName: "nav-text",
  },
  {
    title: "Donations",
    path: "/donation",
    icon: <IoIcons.IoMdPeople />,
    cName: "nav-text",
      
  },
];
