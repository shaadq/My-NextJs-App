"use client";
import { myServices } from "@/service/json-service/service";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "emilys",
    password: "emilyspass",
  });

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await myServices.getToken(formData);
      if (response) {
        router.push("/dashboard");
      }
    } finally {
      setLoading(false);
      toast.success("Login successful");
    }
  };

  return (
    <Row className="m-0">
      <Col md={6} className="bg-success">
        <div className="d-flex align-items-center h-100 justify-content-center">
          <h1 className="text-white">My NextJs App.</h1>
        </div>
      </Col>
      <Col md={6}>
        <div className="vh-100 d-flex flex-column justify-content-center">
          <h2 className="text-center mb-5 ">Login</h2>
          <Row className="justify-content-center">
            <Col md={6}>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="fw-semibold">Username</Form.Label>
                  <Form.Control
                    placeholder="Enter email"
                    value={formData.username}
                    onChange={(e) => handleChange("username", e.target.value)}
                    disabled={loading}
                  />
                </Form.Group>

                <Form.Group className="mb-5" controlId="formBasicPassword">
                  <Form.Label className="fw-semibold">Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    disabled={loading}
                  />
                </Form.Group>
                <div className="d-flex justify-content-center">
                  <Button
                    variant="success"
                    onClick={handleSubmit}
                    className="mx-auto"
                    disabled={loading}
                    style={{ width: "150px" }}
                  >
                    {loading ? (
                      <Spinner className="ms-2" size="sm" />
                    ) : (
                      <span>Login</span>
                    )}
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
    // <div className="container">
    //   <div className="vh-100 d-flex flex-column justify-content-center">
    //     <h1 className="text-center mb-5">Welcome to My NextJS App.</h1>
    //     <Row className="justify-content-center">
    //       <Col md={4}>
    //         <Form>
    //           <Form.Group className="mb-3" controlId="formBasicEmail">
    //             <Form.Label>Username</Form.Label>
    //             <Form.Control
    //               placeholder="Enter email"
    //               value={formData.username}
    //               onChange={(e) => handleChange("username", e.target.value)}
    //               disabled={loading}
    //             />
    //           </Form.Group>

    //           <Form.Group className="mb-3" controlId="formBasicPassword">
    //             <Form.Label>Password</Form.Label>
    //             <Form.Control
    //               type="password"
    //               placeholder="Password"
    //               value={formData.password}
    //               onChange={(e) => handleChange("password", e.target.value)}
    //               disabled={loading}
    //             />
    //           </Form.Group>

    //           <Button
    //             variant="primary"
    //             onClick={handleSubmit}
    //             className="mx-auto"
    //             disabled={loading}
    //           >
    //             {" "}
    //             <span>Submit</span>
    //             {loading && <Spinner className="ms-2" size="sm" />}
    //           </Button>
    //         </Form>
    //       </Col>
    //     </Row>
    //   </div>
    // </div>
  );
};

export default Login;
