import Badge from "@/components/common/badge/Badge";
import { Rate } from "antd";
import React, { useState } from "react";
import { Spinner } from "react-bootstrap";

const ProductCard = ({ item, index }) => {
  return (
    <div className="product-card border border-1 rounded-3 h-100">
      <div className="top-wrapper d-flex pt-3">
        <img
          className="w-100 product-img mx-auto" // Hide until loaded
          src={item.thumbnail}
          alt={item.title}
        />
      </div>
      <hr className="mx-3" />
      <div className="bottom-wrapper px-3 pb-3">
        <div className="d-flex justify-content-between">
          <h6 className="product-title mb-2">{item.title}</h6>
          <h6 className="text-secondary ms-2">
            <strike>{item.discountPercentage}%</strike>
          </h6>
        </div>
        <div className="d-flex align-items-center justify-content-between mb-2">
          <h6 className="text-success mb-0">${item.price}</h6>
          <Badge item={item} />
        </div>
        <Rate
          disabled
          allowHalf
          defaultValue={item.rating}
          className="custom-star"
        />
      </div>
    </div>
  );
};

export default ProductCard;
