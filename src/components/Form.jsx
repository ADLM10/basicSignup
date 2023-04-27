import React, { useCallback, useEffect, useState } from "react";
import addEntry from "../utils/addEntry";
import UserTable from "./UserTable";
import { Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

function FormInput() {

  const [users, setUsers] = useState([]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingUser = users.find(
      (user) => {
        return user.phone === formData.phone || user.firstName === formData.firstName || user.lastName === formData.lastName;
      }
    );

    console.log(existingUser);

    if (existingUser) {
      alert("User already exists");
      return;
    }
    const res = addEntry(formData);
    if (res) {
      alert("User added successfully");
    }
    setUsers(res);

  };

  useEffect(() => {
    const data = localStorage.getItem("users");
    if (data) {
      setUsers(JSON.parse(data));
    }
  }, []);



  return (
    <>
      <div className="container my-3 w-50"
        style={{
          border: "2px solid black",
          borderRadius: "10px",
          padding: "20px",
          boxShadow: "0px 0px 10px 0px black",
        }}
      >

        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" placeholder="First Name"
              value={formData.firstName}
              onChange={(e) => {
                setFormData({ ...formData, firstName: e.target.value });
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="Last Name"
              value={formData.lastName}
              onChange={(e) => {
                setFormData({ ...formData, lastName: e.target.value });
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="tel" placeholder="Phone Number"
              // value={formData.phone}
              onChange={(e) => {
                setFormData({ ...formData, phone: e.target.value });
              }}
            />
          </Form.Group>
          <button className="btn btn-primary" onClick={handleSubmit}>
            Submit
          </button>
        </Form>
      </div>
      <UserTable userData={users} />
      <ToastContainer />
    </>
  );
}

export default FormInput;