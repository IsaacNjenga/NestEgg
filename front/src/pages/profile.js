import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Col, Divider, Form, Input, Row, Select } from "antd";
import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import ImageUploads from "../components/imageUploads";
import axios from "axios";
import { UserContext } from "../App";

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

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  //   imageUrls: "",
  //   avatarId: "",
  phoneNumber: "",
  location: "",
  dob: "",
  occupation: "",
  gender: "",
  img: "",
};

function Profile() {
  const [form] = Form.useForm();
  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const [imagePublicIds, setImagePublicIds] = useState([]);
  const [imageUploading, setImageUploading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { user } = useContext(UserContext);
  const userId = user;

  const handleChange = (name, value) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const valuesData = { ...values, img: imageUrls[0] };

      //console.log(valuesData);
      const res = await axios.put(`users/update/${userId}`, { valuesData });
      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Profile updated successfully",
        });
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
    }
  };

  const handleProfileDelete = () => {
    setDeleteLoading(true);

    try {
      Swal.fire({
        icon: "warning",
        title: "Are you sure?",
        text: "This action cannot be undone!",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Your profile has been successfully deleted!",
          });
        }
      });
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
      setDeleteLoading(false);
    }
  };

  return (
    <>
      <Card
        style={{
          background: "#fff",
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          maxWidth: 1000,
          margin: "15px auto",
          padding: "15px",
          borderRadius: 12,
        }}
      >
        <Divider style={{ borderColor: "#4f46e5" }}>
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
            Set up your profile
          </div>
        </Divider>

        <Form layout="vertical" onFinish={handleSubmit} form={form}>
          <Row gutter={[20, 20]}>
            <Col xs={24} md={8}>
              <ImageUploads
                setImageUploading={setImageUploading}
                imageUrls={imageUrls}
                imagePublicIds={imagePublicIds}
                setLoading={setLoading}
                setImagePublicIds={setImagePublicIds}
                setImageUrls={setImageUrls}
                imageUploading={imageUploading}
              />
            </Col>

            {/* Profile Fields */}
            <Col xs={24} md={16}>
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="First Name"
                    name="firstName"
                    style={labelStyle}
                  >
                    <Input
                      value={values.firstName}
                      onChange={(e) =>
                        handleChange("firstName", e.target.value)
                      }
                      style={inputStyle}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Last Name"
                    name="lastName"
                    style={labelStyle}
                  >
                    <Input
                      value={values.lastName}
                      onChange={(e) => handleChange("lastName", e.target.value)}
                      style={inputStyle}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Username"
                    name="username"
                    style={labelStyle}
                  >
                    <Input
                      value={values.username}
                      onChange={(e) => handleChange("username", e.target.value)}
                      style={inputStyle}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Email Address"
                    name="email"
                    style={labelStyle}
                  >
                    <Input
                      value={values.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      style={inputStyle}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Phone Number"
                    name="phoneNumber"
                    style={labelStyle}
                  >
                    <Input
                      value={values.phoneNumber}
                      onChange={(e) =>
                        handleChange("phoneNumber", e.target.value)
                      }
                      style={inputStyle}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="Gender" name="gender" style={labelStyle}>
                    <Select
                      placeholder="Select gender"
                      value={values.gender}
                      onChange={(value) => handleChange("gender", value)}
                    >
                      <Select.Option value="male">Male</Select.Option>
                      <Select.Option value="female">Female</Select.Option>
                      <Select.Option value="other">Other</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Date of Birth"
                    name="dob"
                    style={labelStyle}
                  >
                    <Input
                      type="date"
                      value={values.dob}
                      onChange={(e) => handleChange("dob", e.target.value)}
                      style={inputStyle}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="Location" name="location">
                    <Input
                      placeholder="City, Country"
                      value={values.location}
                      onChange={(e) => handleChange("location", e.target.value)}
                      style={inputStyle}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item
                    label="Occupation"
                    name="occupation"
                    style={labelStyle}
                  >
                    <Input
                      placeholder="e.g. Accountant"
                      value={values.occupation}
                      onChange={(e) =>
                        handleChange("occupation", e.target.value)
                      }
                      style={inputStyle}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
          <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
            <Button
              block
              type="primary"
              htmlType="submit"
              loading={loading}
              icon={<EditOutlined />}
            >
              Update Your Profile
            </Button>
            <Button
              block
              danger
              type="primary"
              onClick={handleProfileDelete}
              icon={<DeleteOutlined />}
              loading={deleteLoading}
            >
              Delete Your Profile
            </Button>
          </div>
        </Form>
      </Card>
    </>
  );
}

export default Profile;
