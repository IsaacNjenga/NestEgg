import axios from "axios";
import React, {  useEffect, useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Card, Divider, Drawer, Form, Input, Typography } from "antd";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";
import "../assets/css/auth.css";
import ChangePassword from "../components/changePassword";

const cookies = new Cookies();
const { Title, Text } = Typography;

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  username: "",
  phoneNumber: "",
};

const inputStyle = {
  backgroundColor: "#fff",
  border: "1px solid #ccc",
  height: 40,
  fontSize: 14,
  color: "#333",
  fontFamily: "Roboto",
  borderRadius: 8,
  paddingLeft: 10,
};

const labelStyle = {
  color: "#111827",
  fontSize: 16,
  fontWeight: 500,
  fontFamily: "Raleway",
};

// const passwordStrengthChecks = [
//   {
//     label: "At least 8 characters",
//     test: (pwd) => pwd.length >= 8,
//   },
//   {
//     label: "One uppercase letter",
//     test: (pwd) => /[A-Z]/.test(pwd),
//   },
//   {
//     label: "One lowercase letter",
//     test: (pwd) => /[a-z]/.test(pwd),
//   },
//   {
//     label: "One number",
//     test: (pwd) => /\d/.test(pwd),
//   },
//   {
//     label: "One symbol (@$!%*?&...)",
//     test: (pwd) => /[@$!%*?&#^()[\]{}]/.test(pwd),
//   },
// ];

// const renderPasswordFeedback = (password) => (
//   <div style={{ marginTop: 8 }}>
//     {passwordStrengthChecks.map(({ label, test }) => (
//       <div
//         key={label}
//         style={{ fontSize: 13, color: test(password) ? "green" : "red" }}
//       >
//         {test(password) ? "✔️" : "❌"} {label}
//       </div>
//     ))}
//   </div>
// );

function Auth() {
  const [form] = Form.useForm();
  const [values, setValues] = useState(initialValues);
  const [isSignUp, setSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const showDrawer = () => {
    setOpen(true);
  };

  const closeDrawer = () => {
    setOpen(null);
  };

  const switchMode = () => {
    setSignUp((prev) => !prev);
  };

  const handleChange = (name, value) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${isSignUp ? "users/sign-up" : "users/sign-in"}`,
        {
          ...values,
        }
      );
      const { success, token, user } = res.data;
      if (success) {
        Swal.fire({
          icon: "success",
          title: isSignUp ? "Account Created Successfully" : "Login successful",
        });

        if (!isSignUp) {
          cookies.set("token", token);
          cookies.set("userId", user._id);
          cookies.set("username", user.username);
        }

        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response && error.response.data && error.response.data.error
          ? error.response.data.error
          : "An unexpected error occurred. Please try again later.";

      Swal.fire({
        icon: "warning",
        title: "Error",
        text: errorMessage,
      });
    } finally {
      setLoading(false);
      form.resetFields();
      setValues(initialValues);
    }
  };

  return (
    <>
      <div
        className="auth-bg"
        style={{
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <div
            style={{
              width: isMobile ? "100%" : "60%",
              padding: "0px 5px",
              margin: "0px 5px",
              //background: "rgba(255, 255, 255, 0.38)",
              borderRadius: "25px",
              maxWidth: isMobile ? "400px" : "650px",
              textAlign: "left",
              alignContent: "center",
              alignItems: "center",
            }}
            className="auth-back"
          >
            <Title
              level={1}
              style={{
                fontFamily: "Raleway",
                color: "#333",
                fontSize: isMobile ? "1.8rem" : "3.5rem",
                fontWeight: "600",
                letterSpacing: isMobile ? "0px" : "2px",
              }}
            >
              {isSignUp ? "Create Your Free Account" : "Welcome Back"}
            </Title>
            <Title
              level={2}
              style={{
                fontFamily: "Roboto",
                color: "#333",
                fontSize: isMobile ? "1.4rem" : "2rem",
                marginBottom: 0,
              }}
            >
              {isSignUp
                ? "Become a part of our community today! "
                : "We're thrilled to have you back!"}
            </Title>
            <Text
              style={{
                fontFamily: "Roboto",
                color: "#333",
                fontSize: isMobile ? "1rem" : "1.5rem",
                marginTop: 0,
              }}
            >
              {isSignUp
                ? "Create your account in just a few simple steps"
                : "Access your account to continue."}
            </Text>
          </div>
          <div
            style={{
              flex: isMobile ? "none" : 1,
              width: isMobile ? "100%" : "40%",
              margin: 0,
            }}
          >
            <Card
              style={{
                background: "#fff",
                boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                maxWidth: 650,
                margin: isSignUp ? "15px auto" : "125px auto",
                height: "auto",
                width: "100%",
              }}
              className="card"
            >
              <Divider variant="solid" style={{ borderColor: "#4f46e5" }}>
                <div
                  style={{
                    padding: "6px 16px",
                    borderRadius: "30px",
                    background: "#eef2ff",
                    fontFamily: "Raleway",
                    fontWeight: 600,
                    fontSize: 22,
                    color: "#4f46e5",
                  }}
                >
                  <span>
                    {isSignUp
                      ? "Create your account"
                      : "Log in to your account"}
                  </span>
                </div>
              </Divider>
              <Form onFinish={handleSubmit} layout="vertical" form={form}>
                {isSignUp && (
                  <div>
                    <div
                      style={{
                        display: "grid",
                        gap: "10px",
                        gridTemplateColumns:
                          "repeat(auto-fill, minmax(200px,1fr))",
                      }}
                    >
                      {/* First Name */}
                      <Form.Item
                        label={<span style={labelStyle}>First Name</span>}
                        name="firstName"
                        rules={[
                          {
                            required: true,
                            message: "This field is required",
                          },
                        ]}
                      >
                        <Input
                          value={values.firstName}
                          onChange={(e) =>
                            handleChange("firstName", e.target.value)
                          }
                          style={inputStyle}
                        />
                      </Form.Item>
                      {/* Last Name */}
                      <Form.Item
                        label={<span style={labelStyle}>Last Name</span>}
                        name="lastName"
                        rules={[
                          {
                            required: true,
                            message: "This field is required",
                          },
                        ]}
                      >
                        <Input
                          value={values.firstName}
                          onChange={(e) =>
                            handleChange("lastName", e.target.value)
                          }
                          style={inputStyle}
                        />
                      </Form.Item>{" "}
                    </div>{" "}
                    <div
                      style={{
                        display: "grid",
                        gap: "10px",
                        gridTemplateColumns:
                          "repeat(auto-fill, minmax(200px,1fr))",
                      }}
                    >
                      {/* Username */}
                      <Form.Item
                        label={<span style={labelStyle}>Username</span>}
                        name="username"
                        rules={[
                          {
                            required: true,
                            message: "This field is required",
                          },
                        ]}
                      >
                        <Input
                          value={values.username}
                          onChange={(e) =>
                            handleChange("username", e.target.value)
                          }
                          style={inputStyle}
                        />
                      </Form.Item>
                      {/* Email Address */}
                      <Form.Item
                        label={<span style={labelStyle}>Email Address</span>}
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: "This field is required",
                          },
                        ]}
                      >
                        <Input
                          value={values.email}
                          onChange={(e) =>
                            handleChange("email", e.target.value)
                          }
                          style={inputStyle}
                        />
                      </Form.Item>
                      {/* Phone Number */}
                      <Form.Item
                        label={<span style={labelStyle}>Phone Number</span>}
                        name="phoneNumber"
                        rules={[
                          {
                            required: true,
                            message: "This field is required",
                          },
                        ]}
                      >
                        <Input
                          value={values.phoneNumber}
                          onChange={(e) =>
                            handleChange("phoneNumber", e.target.value)
                          }
                          style={inputStyle}
                        />
                      </Form.Item>
                    </div>
                    <div
                      style={{
                        display: "grid",
                        gap: "10px",
                        gridTemplateColumns:
                          "repeat(auto-fill, minmax(200px,1fr))",
                      }}
                    >
                      {/* Password */}
                      <Form.Item
                        label={<span style={labelStyle}>Password</span>}
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: "This field is required",
                          },
                          {
                            pattern:
                              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()[\]{}])[A-Za-z\d@$!%*?&#^()[\]{}]{8,}$/,
                            message: (
                              <span>
                                <ul>
                                  - Password must include:
                                  <li>An uppercase character</li>
                                  <li>A lowercase character</li>
                                  <li>A number</li>
                                  <li>A symbol</li>
                                  <li>At least 8 characters long</li>
                                </ul>
                              </span>
                            ),
                          },
                        ]}
                      >
                        <>
                          <Input.Password
                            iconRender={(visible) =>
                              visible ? (
                                <EyeTwoTone style={{ color: "white" }} />
                              ) : (
                                <EyeInvisibleOutlined
                                  style={{ color: "#333" }}
                                />
                              )
                            }
                            onChange={(e) =>
                              handleChange("password", e.target.value)
                            }
                            value={values.password}
                            style={inputStyle}
                          />
                          {/* {renderPasswordFeedback(values.password)} */}
                        </>
                      </Form.Item>

                      {/* Confirm Password */}

                      <Form.Item
                        label={
                          <span style={labelStyle}>Re-enter password</span>
                        }
                        name="confirmPassword"
                        dependencies={["password"]}
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: "Please confirm your password",
                          },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (
                                !value ||
                                getFieldValue("password") === value
                              ) {
                                return Promise.resolve();
                              }
                              return Promise.reject(
                                new Error("Passwords do not match")
                              );
                            },
                          }),
                        ]}
                      >
                        <Input.Password
                          iconRender={(visible) =>
                            visible ? (
                              <EyeTwoTone style={{ color: "white" }} />
                            ) : (
                              <EyeInvisibleOutlined style={{ color: "#333" }} />
                            )
                          }
                          style={inputStyle}
                        />
                      </Form.Item>
                    </div>
                  </div>
                )}

                {!isSignUp && (
                  <>
                    {/* email */}
                    <Form.Item
                      label={<span style={labelStyle}>Email</span>}
                      name="email"
                      rules={[
                        { required: true, message: "This field is required" },
                      ]}
                    >
                      <Input
                        value={values.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        style={inputStyle}
                      />
                    </Form.Item>
                    <Form.Item
                      label={<span style={labelStyle}>Password</span>}
                      name="password"
                      rules={[
                        { required: true, message: "This field is required" },
                      ]}
                    >
                      <Input.Password
                        iconRender={(visible) =>
                          visible ? (
                            <EyeTwoTone style={{ color: "white" }} />
                          ) : (
                            <EyeInvisibleOutlined style={{ color: "#333" }} />
                          )
                        }
                        onChange={(e) =>
                          handleChange("password", e.target.value)
                        }
                        value={values.password}
                        style={inputStyle}
                      />
                    </Form.Item>
                  </>
                )}

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <p style={{ color: "#333", fontFamily: "Roboto" }}>
                      {isSignUp
                        ? "Already have an account?"
                        : "Don't have an account?"}{" "}
                      <span
                        onClick={switchMode}
                        style={{
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                      >
                        {isSignUp ? "Sign in" : "Sign up"}
                      </span>
                    </p>
                  </div>
                  <div style={{ display: isSignUp ? "none" : "block" }}>
                    <p
                      style={{
                        color: "#333",
                        fontFamily: "Roboto",
                        cursor: "pointer",
                      }}
                      onClick={showDrawer}
                    >
                      Forgot password?
                    </p>{" "}
                    <Drawer
                      width={650}
                      onClose={closeDrawer}
                      open={open}
                      styles={{ body: { paddingBottom: 60 } }}
                    >
                      <ChangePassword setOpen={setOpen} />
                    </Drawer>
                  </div>
                </div>
                {/* Submission button */}
                <Form.Item
                  style={{
                    textAlign: "center",
                    marginTop: 10,
                    marginBottom: 0,
                  }}
                >
                  <Button
                    loading={loading}
                    htmlType="submit"
                    type="primary"
                    style={{
                      background: "rgb(0,0,0,0)",
                      border: "2px solid #333",
                      height: 40,
                      fontSize: 14,
                      fontWeight: "bold",
                      width: "50%",
                      fontFamily: "Raleway",
                      color: "#333",
                    }}
                  >
                    {loading
                      ? isSignUp
                        ? "Signing Up"
                        : "Signing In"
                      : isSignUp
                      ? "Sign Up"
                      : "Sign In"}
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default Auth;
