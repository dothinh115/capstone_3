import React, { createContext } from "react";
import { useForm } from "react-hook-form";

export const FormContext = createContext(null);

const MyForm = ({ defaultValues, onSubmit, children }) => {
  const methods = useForm({
    mode: "all",
    defaultValues,
  });

  const { handleSubmit } = methods;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="register-form-main">
        <FormContext.Provider value={methods}>{children}</FormContext.Provider>
      </div>
    </form>
  );
};

export default MyForm;
