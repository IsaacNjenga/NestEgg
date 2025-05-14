import React, { useContext, useState } from "react";
import { useLocation, Link, Outlet, useNavigate } from "react-router-dom";
import { Layout, Menu, Button, Drawer, Avatar } from "antd";
import { UserContext } from "../App";
import { MenuOutlined, PoweroffOutlined } from "@ant-design/icons";
import icon from "../assets/icons/nestegg.png";
import Cookie from "universal-cookie";
import Swal from "sweetalert2";
import UseGetUser from "../assets/hooks/useGetUser";

const { Header, Content, Footer } = Layout;
const cookies = new Cookie();

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [current, setCurrent] = useState(location.pathname);
  const { isMobile } = useContext(UserContext);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const { userData } = UseGetUser();

  const navItems = [
    //{ label: "Home", path: "/" },
    { label: "Dashboard", path: "/dashboard" },
    { label: "Income", path: "/income" },
    { label: "Expenses", path: "/expenses" },
  ];

  const toggleDrawer = () => setDrawerVisible(!drawerVisible);

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const handleLogout = () => {
    Swal.fire({
      icon: "warning",
      text: "Are you sure you want to logout?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const allCookies = cookies.getAll();
        for (const cookieName in allCookies) {
          if (allCookies.hasOwnProperty(cookieName)) {
            cookies.remove(cookieName);
          }
        }
        window.location.reload();
      }
    });
  };

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <div style={{ position: "sticky", top: 0, zIndex: 1 }}>
          <Header
            style={{
              height: "auto",
              width: "100%",
              background: "#e9e8e6",
              padding: "10px 15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              {isMobile ? (
                <>
                  <img
                    src={icon}
                    alt="icon"
                    style={{
                      width: "40px ",
                      height: "40px",
                      marginRight: "5px",
                      padding: "5px",
                      borderRadius: "50%",
                      border: "1px solid #333",
                    }}
                  />
                  <h1
                    style={{
                      margin: 0,
                      fontSize: "1.3rem",
                      letterSpacing: "1px",
                      fontFamily: "Raleway",
                      // zIndex: 10,
                      color: "#3c3b39",
                    }}
                  >
                    <Link
                      to="/"
                      style={{
                        textDecoration: "none",
                        color: "#3c3b39",
                      }}
                    >
                      NestEgg
                    </Link>
                  </h1>
                </>
              ) : (
                <>
                  {" "}
                  <img
                    src={icon}
                    alt="icon"
                    style={{
                      width: "60px ",
                      height: "60px",
                      marginRight: "10px",
                      padding: "5px",
                      borderRadius: "50%",
                      border: "1px solid #333",
                    }}
                  />
                  <h1
                    style={{
                      margin: 0,
                      fontSize: "2rem",
                      letterSpacing: "2px",
                      fontFamily: "Raleway",
                      // zIndex: 10,
                      color: "#3c3b39",
                      fontWeight: "lighter",
                    }}
                  >
                    <Link
                      to="/"
                      style={{
                        textDecoration: "none",
                        color: "#3c3b39",
                      }}
                    >
                      {" "}
                      NestEgg
                    </Link>
                  </h1>
                </>
              )}
            </div>
            {isMobile ? (
              <>
                <Button
                  type="text"
                  onClick={toggleDrawer}
                  icon={
                    <MenuOutlined
                      style={{ fontSize: "1.8rem", color: "#3c3b39" }}
                    />
                  }
                />
              </>
            ) : (
              <>
                {" "}
                <Menu
                  theme="light"
                  mode="horizontal"
                  selectedKeys={[current]}
                  onClick={handleClick}
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    fontSize: "15px",
                    fontWeight: "lighter",
                    background: "rgb(0,0,0,0)",
                    borderColor: "rgb(0,0,0,0)",
                    fontFamily: "Raleway",
                  }}
                >
                  {navItems.map((item) => (
                    <Menu.Item
                      key={item.path}
                      //   icon={<item.icon style={{ fontSize: "1.8rem" }} />}
                    >
                      <Link
                        to={item.path}
                        style={{
                          color: "#3c3b39",
                          textDecoration: "none",
                        }}
                      >
                        {item.label}
                      </Link>
                    </Menu.Item>
                  ))}
                </Menu>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "20px",
                  }}
                >
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      navigate("/profile");
                    }}
                  >
                    {!userData.img ? (
                      <Avatar
                        style={{
                          backgroundColor: "#fde3cf",
                          color: "#f56a00",
                        }}
                        size="large"
                      >
                        {userData.firstName?.charAt(0)}
                        {userData.lastName?.charAt(0)}
                      </Avatar>
                    ) : (
                      <Avatar
                        src={
                          <img src={userData.img} size="large" alt="avatar" />
                        }
                      />
                    )}
                    {userData.firstName} {userData.lastName}
                  </div>
                  <div>
                    <Button
                      icon={<PoweroffOutlined />}
                      style={{ borderRadius: "50%" }}
                      onClick={handleLogout}
                    ></Button>
                  </div>
                </div>
              </>
            )}
          </Header>{" "}
          {/* Mobile Navigation */}
          <Drawer
            placement="right"
            width={300}
            onClose={toggleDrawer}
            open={drawerVisible}
          >
            <Menu
              mode="vertical"
              selectedKeys={[current]}
              onClick={handleClick}
              style={{
                background: "rgb(0,0,0,0)",
                borderColor: "rgb(0,0,0,0)",
                fontFamily: "Raleway",
                fontWeight: "bold",
              }}
            >
              <Menu.Item>
                <div
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                  onClick={() => {
                    navigate("/profile");
                  }}
                >
                  <div>
                    {userData.firstName} {userData.lastName}
                  </div>
                  <div>
                    {!userData.img ? (
                      <Avatar
                        style={{
                          backgroundColor: "#fde3cf",
                          color: "#f56a00",
                        }}
                        size="large"
                      >
                        {userData.firstName?.charAt(0)}
                        {userData.lastName?.charAt(0)}
                      </Avatar>
                    ) : (
                      <Avatar
                        src={
                          <img src={userData.img} size="large" alt="avatar" />
                        }
                      />
                    )}
                  </div>
                </div>
              </Menu.Item>
              {navItems.map((item) => (
                <Menu.Item key={item.path}>
                  <Link
                    to={item.path}
                    style={{ color: "#3c3b39", textDecoration: "none" }}
                  >
                    {item.label}
                  </Link>
                </Menu.Item>
              ))}
              <Menu.Item>
                <div>
                  <Button
                    type="primary"
                    danger
                    onClick={handleLogout}
                    style={{
                      cursor: "pointer",
                      fontFamily: "Raleway",
                      fontWeight: "bold",
                    }}
                  >
                    Sign Out
                  </Button>
                </div>
              </Menu.Item>
            </Menu>
          </Drawer>
        </div>
        {/* Main Content */}
        <Content
          style={{
            padding: isMobile ? "0px 0px" : "0px 0px",
            minHeight: "calc(100vh - 64px - 70px)",
          }}
        >
          <Outlet />
        </Content>
        {/* Footer */}
        <Footer
          style={{
            padding: "0px 0px",
            margin: "0px 0px",
            background: "#eae9e7",
          }}
        ></Footer>
      </Layout>
    </>
  );
}

export default Navbar;
