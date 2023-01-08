import React from "react";

const MainBlock = ({
  value,
  style,
  iconStyle,
  iconColor,
  headerValue = "THÔNG BÁO",
  headerRight = null,
  hrFooterValue = null,
  hrFooterTitle = "Hoặc",
  otherClass = null,
}) => {
  return (
    <div
      className={`main-container ${otherClass && otherClass}`}
      style={{ marginBottom: "20px", ...style }}
    >
      {headerValue && (
        <div className="page-header">
          <h1>{headerValue}</h1>
          {headerRight}
        </div>
      )}
      <div className="main-body">
        {iconStyle && (
          <i
            className={`fa-solid fa-${iconStyle}`}
            style={{ color: iconColor }}
          ></i>
        )}
        {value}
        {hrFooterValue && (
          <div className="footer-hr-span" style={{ marginTop: "20px" }}>
            <span>{hrFooterTitle}</span>
            <div>{hrFooterValue}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainBlock;
