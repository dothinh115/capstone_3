import React from "react";
import { useForm } from "react-hook-form";

const RegisterForm = ({ onSubmit, children }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
      name: "",
      gender: true,
      phone: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="register-form-main">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              register,
            });
          }
          return child;
        })}
      </div>
    </form>
  );
};

export default RegisterForm;
