import React from "react";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';

<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
export const SidebarData = [
  {
    title: "Profile",
    path: "/profile",
    icon: <PersonOutlineOutlinedIcon />,
    cName: "nav-text",
  },
  {
    title: "Home",
    path: "/home",
    icon: <HomeOutlinedIcon />,
    cName: "nav-text",
  },
  {
    title: "Forum",
    path: "/forum",
    icon: <ForumOutlinedIcon />,
    cName: "nav-text",
  },
  {
    title: "Business",
    path: "/dashboard",
    icon: <StorefrontOutlinedIcon />,
    cName: "nav-text",
  },
  {
    title: "Donations",
    path: "/donation",
    icon: <VolunteerActivismOutlinedIcon />,
    cName: "nav-text",
  }
];
