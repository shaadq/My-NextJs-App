import { userRoles } from "@/enum-list/enumList";
import React from "react";
import { Badge, Col, Row } from "react-bootstrap";

const UserProfile = ({ userInfo }) => {
  return (
    <Row md={2}>
      {/* <div className="user-profile-item">
        <label htmlFor="" className="form-label fw-semibold">
          Name
        </label>
        <p className="text-wrap">{userInfo.data?.users?.name}</p>
      </div>
      <div className="user-profile-item">
        <label htmlFor="" className="form-label fw-semibold">
          Role
        </label>
        <p>
          <Badge bg={`${userRoles?.roles[userInfo.data?.users?.role]?.class}`}>
            {userRoles?.roles[userInfo.data?.users?.role]?.text}
          </Badge>
        </p>
      </div>
      <div className="user-profile-item">
        <label htmlFor="" className="form-label fw-semibold">
          Email
        </label>
        <p>{userInfo.data?.users?.email}</p>
      </div>
      <div className="user-profile-item">
        <label htmlFor="" className="form-label fw-semibold">
          Contact
        </label>
        <p>{userInfo.data?.contact}</p>
      </div>
      <div className="user-profile-item">
        <label htmlFor="" className="form-label fw-semibold">
          Location
        </label>
        <p>{userInfo.data?.location}</p>
      </div> */}
      {/* <Col>
        <div>
          <label htmlFor="" className="form-label fw-semibold">
            Name
          </label>
          <p className="text-wrap">{userInfo.data?.users?.name}</p>
        </div>
      </Col> */}

      <Col>
        <div>
          <label htmlFor="" className="form-label fw-semibold">
            Email
          </label>
          <p className="text-wrap">{userInfo.data?.users?.email}</p>
        </div>
      </Col>
      <Col>
        <div>
          <label htmlFor="" className="form-label fw-semibold">
            Role
          </label>
          <p>
            <Badge
              bg={`${userRoles?.roles[userInfo.data?.users?.role]?.class}`}
            >
              {userRoles?.roles[userInfo.data?.users?.role]?.text}
            </Badge>
          </p>
        </div>
      </Col>
      <Col>
        <div>
          <label htmlFor="" className="form-label fw-semibold">
            Contact
          </label>
          <p>{userInfo.data?.contact}</p>
        </div>
      </Col>
      <Col>
        <div>
          <label htmlFor="" className="form-label fw-semibold">
            Location
          </label>
          <p>{userInfo.data?.location}</p>
        </div>
      </Col>
    </Row>
  );
};

export default UserProfile;
