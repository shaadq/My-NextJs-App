"use client";
import CustomSpinner from "@/components/common/custom-spinner/CustomSpinner";
import { myServices } from "@/service/json-service/service";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSingleUser = async () => {
      setLoading(true);
      try {
        const userCookie = JSON.parse(Cookies.get("user"));
        const data = await myServices.fetchSingleUser(userCookie.id);
        setUser(data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchSingleUser();
  }, []);

  return (
    <React.Fragment>
      {loading ? (
        <CustomSpinner />
      ) : (
        <Row md={5}>
          <Col className="mb-4">
            <div>
              <h6>First Name</h6>
              <div>{user?.firstName}</div>
            </div>
          </Col>
          <Col className="mb-4">
            <div>
              <h6>Last Name</h6>
              <div>{user?.lastName}</div>
            </div>
          </Col>
          <Col className="mb-4">
            <div>
              <h6>Maiden Name</h6>
              <div>{user?.maidenName}</div>
            </div>
          </Col>
          <Col className="mb-4">
            <div>
              <h6>Age</h6>
              <div>{user?.age}</div>
            </div>
          </Col>
          <Col className="mb-4">
            <div>
              <h6>Gender</h6>
              <div>{user?.gender}</div>
            </div>
          </Col>
          <Col className="mb-4">
            <div>
              <h6>Email</h6>
              <div className="text-wrap">{user?.email}</div>
            </div>
          </Col>
          <Col className="mb-4">
            <div>
              <h6>Phone</h6>
              <div>{user?.phone}</div>
            </div>
          </Col>
          <Col className="mb-4">
            <div>
              <h6>Username</h6>
              <div>{user?.username}</div>
            </div>
          </Col>
          <Col className="mb-4">
            <div>
              <h6>Birth Date</h6>
              <div>{user?.birthDate}</div>
            </div>
          </Col>
          <Col className="mb-4">
            <div>
              <h6>Blood Group</h6>
              <div>{user?.bloodGroup}</div>
            </div>
          </Col>
          <Col className="mb-4">
            <div>
              <h6>Height</h6>
              <div>{user?.height} cm</div>
            </div>
          </Col>
          <Col className="mb-4">
            <div>
              <h6>Weight</h6>
              <div>{user?.weight} kg</div>
            </div>
          </Col>
          <Col className="mb-4">
            <div>
              <h6>Eye Color</h6>
              <div>{user?.eyeColor}</div>
            </div>
          </Col>
          <Col className="mb-4">
            <div>
              <h6>Hair Color</h6>
              <div>{user?.hair?.color}</div>
            </div>
          </Col>
          <Col className="mb-4">
            <div>
              <h6>Hair Type</h6>
              <div>{user?.hair?.type}</div>
            </div>
          </Col>
          <Col className="mb-4">
            <div>
              <h6>Address</h6>
              <div>
                {user?.address?.address}, {user?.address?.city},{" "}
                {user?.address?.state} - {user?.address?.postalCode},{" "}
                {user?.address?.country}
              </div>
            </div>
          </Col>
          <Col className="mb-4">
            <div>
              <h6>University</h6>
              <div>{user?.university}</div>
            </div>
          </Col>
          <Col className="mb-4">
            <div>
              <h6>Company</h6>
              <div>{user?.company?.name}</div>
            </div>
          </Col>
          <Col className="mb-4">
            <div>
              <h6>Department</h6>
              <div>{user?.company?.department}</div>
            </div>
          </Col>
          <Col className="mb-4">
            <div>
              <h6>Job Title</h6>
              <div>{user?.company?.title}</div>
            </div>
          </Col>
          <Col className="mb-4">
            <div>
              <h6>Bank Card Type</h6>
              <div>{user?.bank?.cardType}</div>
            </div>
          </Col>
          <Col className="mb-4">
            <div>
              <h6>Crypto Wallet</h6>
              <div className="text-wrap">{user?.crypto?.wallet}</div>
            </div>
          </Col>
          <Col className="mb-4">
            <div>
              <h6>Role</h6>
              <div>{user?.role}</div>
            </div>
          </Col>
          <Col className="mb-4">
            <div>
              <h6>Profile Image</h6>
              <img src={user?.image} alt="User Avatar" width="80" />
            </div>
          </Col>
        </Row>
      )}
    </React.Fragment>
  );
}
