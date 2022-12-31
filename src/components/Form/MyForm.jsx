import React from "react";
import { useForm } from "react-hook-form";

const MyForm = ({ defaultValues, onSubmit, children }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: "all",
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="register-form-main">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              register,
              errors,
              watch,
            });
          }
          return child;
        })}
      </div>
    </form>
  );
};

export default MyForm;
