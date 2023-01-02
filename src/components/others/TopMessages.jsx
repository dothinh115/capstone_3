import React from "react";

const TopMessages = ({
  value,
  style,
  iconStyle,
  iconColor,
  header = false,
  hrFooter = false,
  hrFooterFunc,
  hrFooterButtonValue,
}) => {
  return (
    <div className="main-container" style={{ marginBottom: "20px", ...style }}>
      {header && (
        <div className="page-header">
          <h1>THÔNG BÁO</h1>
        </div>
      )}
      <div className="main-body">
        <p>
          {iconStyle && (
            <i
              className={`fa-solid fa-${iconStyle}`}
              style={{ color: iconColor }}
            ></i>
          )}
          {value}
          {hrFooter && (
            <div className="footer-hr-span" style={{ marginTop: "20px" }}>
              <span>Hoặc</span>
              <div>
                <button className="btn" onClick={hrFooterFunc}>
                  {hrFooterButtonValue}
                </button>
              </div>
            </div>
          )}
        </p>
      </div>
    </div>
  );
};

export default TopMessages;
