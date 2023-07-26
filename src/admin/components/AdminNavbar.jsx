import { Link, Outlet } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { Avatar, Stack, Badge, IconButton, InputBase } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import SmsIcon from "@mui/icons-material/Sms";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import "./Navbar.css";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as GiIcons from "react-icons/gi";
import * as BiIcons from "react-icons/bi";
import { UserContext } from "../../UserContext";

function AdminNavbar() {
  // const [sidebar, setSidebar] = useState(true);
  const [notification, setNotification] = useState(0);
  const [collapsed, setCollapsed] = useState(false);

  const { user, setUser } = useContext(UserContext);

  // send an fetch Api request to get the result with pending .. status
  useEffect(() => {
    async function getNewRegistration() {
      try {
        const response = await fetch(
          "http://localhost/incubation_system_rest_api/Admin/notification.php",
          {
            method: "GET",
            header: {
              "Content-Type": "application/json",
            },
          }
        );

        const responseData = await response.json();
        const newReading = responseData.data;
        if (responseData.status === 200) {
          setNotification(newReading);
        } else {
          setNotification(0);
        }
      } catch (error) {
        console.error("Error:".error);
      }
    }
    getNewRegistration();

    const interval = setInterval(() => {
      getNewRegistration();
    }, 3000);

    // Clear the interval when the component unmounts or when the dependencies change
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div style={{ display: "flex", height: "100vh", minHeight: "400px" }}>
        <Sidebar
          backgroundColor="#0f416f"
          width="220px"
          collapsed={collapsed}
          collapsedWidth="0"
          transitionDuration={700}
        >
          <Menu
            menuItemStyles={{
              button: {
                color: "#ffffff",
                "&:hover": {
                  backgroundColor: "#185B9B",
                },
                [`&.active`]: {
                  backgroundColor: "#13395e",
                  color: "#b6c8d9",
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
                // className="ms-2"
                // height={imageHeight}
              />
              <div className="d-block mt-3">
                <div
                  className="d-inline-block ms-2"
                  style={{ color: "#FF7200" }}
                >
                  <span className="d-block fw-bold">Admin</span>
                  <span className="d-block">
                    {user && user.firstName} {user && user.lastName}
                  </span>
                </div>
              </div>
            </div>

            <MenuItem
              icon={<AiIcons.AiFillDashboard />}
              component={<Link to="/admin" />}
            >
              Dashboard
            </MenuItem>
            <MenuItem
              icon={<FaIcons.FaStamp />}
              component={<Link to="/admin/patent" />}
            >
              Patents
            </MenuItem>
            <p
              className=" my-1 fw-bold border-bottom"
              style={{ color: "#FF7200" }}
            >
              <span className="ms-3">USERS</span>
            </p>
            <MenuItem
              icon={<FaIcons.FaUsers />}
              component={<Link to="/admin/innovator" />}
            >
              Innovators
            </MenuItem>
            <MenuItem
              icon={<GiIcons.GiTeacher />}
              component={<Link to="/admin/mentor" />}
            >
              Mentors
            </MenuItem>
            <MenuItem
              icon={<AdminPanelSettingsOutlinedIcon />}
              component={<Link to="/admin/admins" />}
            >
              Admins
            </MenuItem>
            <p
              className=" my-1 fw-bold border-bottom"
              style={{ color: "#FF7200" }}
            >
              <span className="ms-3">Reports</span>
            </p>
            <MenuItem
              icon={<FaIcons.FaChartLine />}
              component={<Link to="/admin/progress" />}
            >
              Incubate progress
            </MenuItem>
            <MenuItem
              icon={<FaIcons.FaUser />}
              component={<Link to="/admin/profile" />}
            >
              Profile
            </MenuItem>
            <MenuItem icon={<BiIcons.BiLogOut />} component={<Link to="/" />}>
              Logout
            </MenuItem>
          </Menu>
        </Sidebar>
        <main style={{ width: "100vw" }} className="bg-body-secondary">
          <nav
            className="navbar navbar-expand-lg p-0 m-0 bg-light sticky-top border-bottom mb-0"
            id="navbar"
          >
            <div className="container-fluid">
              <IconButton
                sx={{ p: "10px", fontSize: "36px" }}
                aria-label="menu"
              >
                <MenuIcon onClick={() => setCollapsed(!collapsed)} />
              </IconButton>
              <span className="me-2 bg-dark-subtle">
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search..."
                  inputProps={{ "aria-label": "search google maps" }}
                />
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
              </span>

              <Stack direction="row" spacing={2} className="ms-auto">
                <span className="d-flex align-items-center">
                  <IconButton className="me-2">
                    <Badge badgeContent={notification} color="secondary">
                      <FaIcons.FaRegBell
                        color="action"
                        style={{ fontSize: "20px" }}
                      />
                    </Badge>
                  </IconButton>
                  <IconButton className="me-2">
                    <Badge badgeContent={1} color="secondary">
                      <SmsIcon color="action" style={{ fontSize: "20px" }} />
                    </Badge>
                  </IconButton>

                  <SettingsIcon />
                </span>
                <Avatar alt="Remy Sharp" src={user && user.photo} />
              </Stack>
            </div>
          </nav>
          <Outlet />
        </main>
      </div>
    </>
  );
}
export default AdminNavbar;
