import React from "react";
import { useFormContext } from "react-hook-form";

const MyFormButton = ({ btn }) => {
  const {
    formState: { isValid },
  } = useFormContext();
  return (
    <div className="item">
      <div className="item-left"></div>
      <div className="item-right">
        <div className="form-button">
          {btn.map((item, index) => {
            return (
              <button
                onClick={item.function && item.function}
                key={index}
                type={item.type}
                className={`btn ${item.className}`}
              >
                {item.value}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyFormButton;
