import React from "react";
import { dataConfig } from "../../util/config";

const Input = ({ index, item, register, type }) => {
  return (
    <div className="item">
      <div className="item-left">
        <i className={`fa-solid fa-${dataConfig.icon[index]}`}></i>
        {dataConfig.name[index]}
      </div>
      <div className="item-right">
        {type === "input" ? (
          <input
            name={item}
            type={item === "password" ? "password" : "text"}
            // className={errors[item]?.message && "isInvalid"}
            placeholder={dataConfig.placeHolder[index]}
            {...register(item, {
              required: "Không được để trống!",
              pattern: {
                value: dataConfig.reg[index],
                message: dataConfig.errorMessage[index],
              },
            })}
          />
        ) : (
          <select {...register}>
            <option value="true">Nam</option>
            <option value="false">Nữ</option>
          </select>
        )}

        {/* {errors[item]?.message && (
          <div className="form-error">
            <i
              className="fa-solid fa-circle-exclamation"
              style={{ color: "red" }}
            ></i>
            {errors[item]?.message}
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Input;
