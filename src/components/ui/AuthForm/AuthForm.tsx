import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputForm from "./components/AuthInputForm";
import { registerSchema, loginSchema } from "./models/form.model";

import type { SubmitHandler } from "react-hook-form";
import type { RegisterSchemaType, LoginSchemaType } from "./models";

export const RegisterForm = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur"
  });

  const onSubmit: SubmitHandler<RegisterSchemaType> = (data) => {
    // Handle form submission
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputForm name="name" control={control} label="Name" type="text" error={errors.name} />
      <InputForm name="email" control={control} label="Email" type="email" error={errors.email} />
      <InputForm name="password" control={control} label="Password" type="password" error={errors.password} />
      <InputForm name="confirmPassword" control={control} label="Confirm Password" type="password" error={errors.confirmPassword} />
      <button type="submit" > Submit</button>
    </form>
  );
}

export const LoginForm = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur"
  });

  const onSubmit: SubmitHandler<LoginSchemaType> = (data) => {
    // Handle form submission
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputForm name="email" control={control} label="Email" type="email" error={errors.email} />
      <InputForm name="password" control={control} label="Password" type="password" error={errors.password} />
      <button type="submit" > Submit</button>
    </form>
  );
}