import React, { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { dataConfig } from "../../util/config";
import { getIndexDataConfig } from "../../util/function";

export const Input = ({
  item,
  type,
  placeHolder = true,
  required = true,
  validate = true,
  disabled = false,
  customError = null,
}) => {
  const location = useLocation();

  const {
    register,
    watch,
    setError,
    getValues,
    formState: { errors },
  } = useFormContext();
  const alreadyExistEmail = useRef(null);
  useEffect(() => {
    if (customError) {
      setError(item, { message: customError });
      alreadyExistEmail.current = getValues(item);
    }
  }, [customError, errors]);

  const index = getIndexDataConfig(item);

  return (
    <div className="item">
      <div className="item-left">
        <i className={`fa-solid fa-${dataConfig.icon[index]}`}></i>
        {dataConfig.name[index]}
      </div>
      <div className="item-right">
        <input
          name={item}
          type={type}
          className={errors[item]?.message && "isInvalid"}
          placeholder={placeHolder ? dataConfig.placeHolder[index] : ""}
          {...register(item, {
            ...(validate &&
              location.pathname !== "/login" && {
                pattern: {
                  value: dataConfig.reg[index],
                  message: dataConfig.errorMessage[index],
                },
                ...(item === "passwordConfirm" && {
                  validate: (value) => {
                    if (watch("password") !== value)
                      return dataConfig.errorMessage[index];
                  },
                }),
                ...(customError && {
                  validate: (value) => {
                    if (value === alreadyExistEmail.current) return customError;
                  },
                }),
              }),
            ...(required && { required: "Không được để trống!" }),
          })}
          disabled={disabled ? true : false}
        />

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

export const Select = ({ item }) => {
  const index = getIndexDataConfig(item);
  const { register } = useFormContext();
  return (
    <div className="item">
      <div className="item-left">
        <i className={`fa-solid fa-${dataConfig.icon[index]}`}></i>
        {dataConfig.name[index]}
      </div>
      <div className="item-right">
        <select {...register}>
          <option value="true">Nam</option>
          <option value="false">Nữ</option>
        </select>
      </div>
    </div>
  );
};
