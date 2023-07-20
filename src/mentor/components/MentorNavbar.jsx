import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Avatar, Stack, Badge } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import BackupTableIcon from "@mui/icons-material/BackupTable";
import * as FaIcons from "react-icons/fa";
import * as FcIcons from "react-icons/fc";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import { Link, Outlet } from "react-router-dom";

function MentorNavbar() {
  const [collapsed, setCollapsed] = useState();

  return (
    <div className="container-fluid p-0">
      <div
        style={{
          display: "flex",
          height: "100vh",
          minHeight: "400px",
        }}
      >
        <Sidebar
          backgroundColor="#0f416f"
          width="240px"
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
                  <span className="d-block fw-bold">Mentor</span>
                  <span className="d-block">Jonah Wakahiu</span>
                </div>
              </div>
            </div>
            <MenuItem icon={<AiIcons.AiFillHome />}>Dashboard</MenuItem>

            <MenuItem icon={<FaIcons.FaUsers />}>Innovators</MenuItem>
            <p
              className="my-1 fw-bold border-bottom"
              style={{ color: "#FF7200 " }}
            >
              <span className="ms-3">REPORTS</span>
            </p>
            <MenuItem
              icon={<FcIcons.FcComboChart />}
              component={<Link to="/mentor/accelerationreport" />}
            >
              Innovation acceleration
            </MenuItem>
            <MenuItem
              icon={<BackupTableIcon />}
              component={<Link to="/mentor/expectation" />}
            >
              Incubate Expectation
            </MenuItem>
            <MenuItem
              icon={<FaIcons.FaUser />}
              component={<Link to="/mentor/profile" />}
            >
              Profile
            </MenuItem>
            <MenuItem icon={<BiIcons.BiLogOut />}>Logout</MenuItem>
          </Menu>
        </Sidebar>
        <main className="w-100">
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
                  <Badge badgeContent={4} color="secondary" className="me-3">
                    <FaIcons.FaRegBell
                      color="action"
                      style={{ fontSize: "20px" }}
                    />
                  </Badge>
                  <SettingsIcon />
                </span>
                <Avatar alt="Remy Sharp" src="/img/user22.jpg" />
              </Stack>
            </div>
          </nav>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MentorNavbar;
