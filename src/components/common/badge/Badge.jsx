import { enumList } from "@/enum-list/enumList";
import React from "react";

const Badge = ({ item }) => {
  return (
    <div
      className="rounded-5 product-badge"
      style={{
        color: enumList?.productCategories?.badge[item.category]?.color,
        background:
          enumList?.productCategories?.badge[item.category]?.background,
        borderColor: enumList?.productCategories?.badge[item.category]?.border,
      }}
    >
      {enumList?.productCategories?.badge[item.category]?.text}
    </div>
  );
};

export default Badge;
