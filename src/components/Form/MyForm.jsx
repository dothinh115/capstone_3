import React from "react";
import { FormProvider, useForm } from "react-hook-form";

const MyForm = ({ defaultValues, onSubmit, children }) => {
  const methods = useForm({
    mode: "onChange",
    defaultValues,
  });

  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="register-form-main">{children}</div>
      </form>
    </FormProvider>
  );
};

export default MyForm;
