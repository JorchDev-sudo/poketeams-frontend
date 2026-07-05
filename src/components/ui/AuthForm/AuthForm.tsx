import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputForm from "./components/AuthInputForm";
import { registerSchema, loginSchema } from "./models/form.model";
import { authApi } from "../../../lib/api.ts";
import {useAuth} from "../../../context/AuthContext.tsx";
import { useNavigate } from "react-router-dom";
import type { SubmitHandler } from "react-hook-form";
import type { RegisterSchemaType, LoginSchemaType } from "./models";


export const RegisterForm = () => {
  const { control, handleSubmit, formState: { errors }, setError } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur"
  });

  const navigate = useNavigate()
  const { login } = useAuth();

  const onSubmit: SubmitHandler<RegisterSchemaType> = async (data) => {
    try{
      const response = await authApi.register(data);
      login(response.token);
      navigate("/");

    }catch(e){
      setError('root', {
      message: e instanceof Error ? e.message : 'Unknown error'})
    }
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
  const { control, handleSubmit, formState: { errors }, setError } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur"
  });

  const navigate = useNavigate()
  const { login } = useAuth();

  const onSubmit: SubmitHandler<LoginSchemaType> = async (data) => {
    try{
      const response = await authApi.login(data);
      login(response.token);
      navigate("/");

    }catch(e){
      setError('root', {
      message: e instanceof Error ? e.message : 'Unknown error'})
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputForm name="email" control={control} label="Email" type="email" error={errors.email} />
      <InputForm name="password" control={control} label="Password" type="password" error={errors.password} />
      <button type="submit" > Submit</button>
    </form>
  );
}