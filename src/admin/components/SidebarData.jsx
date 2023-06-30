import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as RiIcons from "react-icons/ri";
import * as GiIcons from "react-icons/gi";
import * as BiIcons from "react-icons/bi";

export const sidebarData = [
  {
    title: "Home",
    path: "/admin",
    icons: <AiIcons.AiFillDashboard />,
    cName: "nav-text",
  },
  {
    title: "Innovator",
    path: "/admin/innovator",
    icons: <GiIcons.GiTechnoHeart />,
    cName: "nav-text",
  },
  {
    title: "Mentor",
    path: "/admin/mentor",
    icons: <FaIcons.FaUsersCog />,
    cName: "nav-text",
  },
  {
    title: "Admin",
    path: "/admin/admins",
    icons: <RiIcons.RiAdminFill />,
    cName: "nav-text",
  },

  {
    title: "Registrations",
    path: "/admin/registration",
    icons: <BiIcons.BiMessageAltDetail />,
    cName: "nav-text",
  },
  {
    title: "Profile",
    path: "/admin/profile",
    icons: <FaIcons.FaUserCircle />,
    cName: "nav-text",
  },
];
