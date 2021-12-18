import React from "react";

const NoDataFound = ({ name, filter }) => {
  const visibility = !name ? "none" : "flex";
  const height = filter ? "182px" : "60px";

  return (
    <div
      style={{
        display: visibility,
        alignItems: "center",
        justifyContent: "center",
        height: `calc(100% - ${height})`,
      }}
    >
      <p
        style={{
          color: "grey",
        }}
      >
        {name}
      </p>
    </div>
  );
};

export default NoDataFound;
