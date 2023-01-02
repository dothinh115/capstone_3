import React from "react";

const TopMessages = ({ value, style, iconStyle, iconColor }) => {
  return (
    <div className="main-container" style={{ marginBottom: "20px", ...style }}>
      <div className="page-header">
        <p>
          {iconStyle && (
            <i
              className={`fa-solid fa-${iconStyle}`}
              style={{ color: iconColor }}
            ></i>
          )}
          {value}
        </p>
      </div>
    </div>
  );
};

export default TopMessages;
