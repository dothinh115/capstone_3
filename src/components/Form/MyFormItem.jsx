import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { dataConfig } from "../../util/config";
import { getIndexDataConfig } from "../../util/function";
import { FormContext } from "./MyForm";

const Input = ({ item, type }) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useContext(FormContext);

  const index = getIndexDataConfig(item);
  const location = useLocation();
  const checkLoginPage = () => {
    if (location.pathname === "/login" && item === "password") return true;
    return false;
  };
  const checkEditPage = () => {
    if (location.pathname === "/profile/profile-edit" && item === "email")
      return true;
    return false;
  };
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
            type={
              item === "password" || item === "passwordConfirm"
                ? "password"
                : "text"
            }
            className={errors[item]?.message && "isInvalid"}
            placeholder={!checkLoginPage() ? dataConfig.placeHolder[index] : ""}
            {...register(item, {
              ...(!checkLoginPage() && {
                ...(item === "passwordConfirm"
                  ? {
                      validate: (value) => {
                        if (watch("password") !== value)
                          return dataConfig.errorMessage[index];
                      },
                    }
                  : {
                      pattern: {
                        value: dataConfig.reg[index],
                        message: dataConfig.errorMessage[index],
                      },
                    }),
              }),
              required: "Không được để trống!",
            })}
            disabled={checkEditPage() ? true : false}
          />
        ) : (
          <select {...register}>
            <option value="true">Nam</option>
            <option value="false">Nữ</option>
          </select>
        )}

        {errors[item]?.message && (
          <div className="form-error">
            <i
              className="fa-solid fa-circle-exclamation"
              style={{ color: "red" }}
            ></i>
            {errors[item]?.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
