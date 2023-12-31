import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Avatar, Stack, Badge } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { Outlet, Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import { useState, useContext } from "react";
import FeedIcon from "@mui/icons-material/Feed";
import "../Innovator.css";
import { UserContext } from "../../UserContext";

function InnovatorNavbar() {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useContext(UserContext);

  return (
    <div
      style={{ display: "flex", height: "100vh", minHeight: "400px" }}
      id="wrapper"
    >
      <Sidebar
        id="fixed-sidebar"
        backgroundColor="#0f416f"
        width="230px"
        collapsed={collapsed}
        collapsedWidth="0"
        transitionDuration={700}
      >
        <Menu
          menuItemStyles={{
            button: {
              color: "#ffffff",
              "&:hover": {
                backgroundColor: "#185B9B ",
              },
            },
            icon: {
              fontSize: "25px",
            },
          }}
        >
          <div className="d-inline-flex align-items-center pb-2 w-100 mt-3 border-bottom">
            <img
              src="/img/background01.png"
              alt="ku logo"
              width="50"
              height="50"
              className="d-inline-block align-top"
            />
            <div className="d-block mt-3">
              <div
                className="d-inline-block  ms-2"
                style={{ color: "#FF7200 " }}
              >
                <span className="d-block fw-bold">Innovator</span>
                <span className="d-block">
                  {user && user.firstName} {user && user.lastName}
                </span>
              </div>
            </div>
          </div>
          <MenuItem
            icon={<AiIcons.AiFillHome />}
            component={<Link to="/innovator" />}
          >
            Dashboard
          </MenuItem>

          <MenuItem
            component={<Link to="/innovator/expectation" />}
            icon={<FeedIcon />}
          >
            Reports
          </MenuItem>

          <p
            className="my-1 fw-bold border-bottom"
            style={{ color: "#FF7200 " }}
          >
            <span className="ms-3">USER</span>
          </p>
          <MenuItem
            component={<Link to="/innovator/profile" />}
            icon={<FaIcons.FaUser />}
          >
            Profile
          </MenuItem>
          <MenuItem icon={<BiIcons.BiLogOut />} component={<Link to="/" />}>
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>
      <main className="w-100 bg-body-secondary">
        <nav
          className="navbar navbar-expand-lg p-0 m-0 bg-light sticky-top border-bottom"
          id="navbar"
        >
          <div className="container-fluid">
            <FaIcons.FaThList
              className="me-2"
              style={{ fontSize: "20px" }}
              onClick={() => setCollapsed(!collapsed)}
            />
            <Stack direction="row" spacing={2} className="ms-auto">
              <span className="d-flex align-items-center">
                <Badge badgeContent={1} color="secondary" className="me-3">
                  <FaIcons.FaRegBell
                    color="action"
                    style={{ fontSize: "20px" }}
                  />
                </Badge>
                <SettingsIcon />
              </span>
              <Avatar alt="user22" src={user && user.photo} />
            </Stack>
          </div>
        </nav>
        <Outlet />
      </main>
    </div>
  );
}

export default InnovatorNavbar;
