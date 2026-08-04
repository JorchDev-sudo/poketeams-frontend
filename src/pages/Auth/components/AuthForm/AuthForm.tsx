import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import InputForm from "@/components/shared/InputForm/InputForm.tsx"
import { registerSchema, loginSchema, RegisterSchemaType, LoginSchemaType } from "@/pages/Auth/models/form.model.ts";
import { authApi } from "@/lib/api.ts";
import { useAuth } from "@/context/AuthContext.tsx";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const RegisterForm = () => {
  const { control, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const navigate = useNavigate()
  const { login } = useAuth();

  const onSubmit: SubmitHandler<RegisterSchemaType> = async (data) => {
    try {
      const response = await authApi.register(data);
      login(response.token);
      navigate("/");

    } catch (e) {
      setError('root', {
        message: e instanceof Error ? e.message : 'Unknown error'
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
      <InputForm name="name" control={control} label="Name" type="text" error={errors.name} />
      <InputForm name="email" control={control} label="Email" type="email" error={errors.email} />
      <InputForm name="password" control={control} label="Password" type="password" error={errors.password} />
      <InputForm name="confirmPassword" control={control} label="Confirm password" type="password" error={errors.confirmPassword} />

      {errors.root && (
        <p role="alert" className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {errors.root.message}
        </p>
      )}

      <Button type="submit" size="lg" className="mt-1 w-full" disabled={isSubmitting}>
        {isSubmitting ? "Creating account…" : "Create account"}
      </Button>
    </form>
  );
}

export const LoginForm = () => {
  const { control, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const navigate = useNavigate()
  const { login } = useAuth();

  const onSubmit: SubmitHandler<LoginSchemaType> = async (data) => {
    try {
      const response = await authApi.login(data);
      login(response.token);
      navigate("/");

    } catch (e) {
      setError('root', {
        message: e instanceof Error ? e.message : 'Unknown error'
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
      <InputForm name="email" control={control} label="Email" type="email" error={errors.email} />
      <InputForm name="password" control={control} label="Password" type="password" error={errors.password} />

      {errors.root && (
        <p role="alert" className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {errors.root.message}
        </p>
      )}

      <Button type="submit" size="lg" className="mt-1 w-full" disabled={isSubmitting}>
        {isSubmitting ? "Logging in…" : "Log in"}
      </Button>
    </form>
  );
}
