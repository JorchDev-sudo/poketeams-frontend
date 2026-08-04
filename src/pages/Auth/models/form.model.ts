import { z } from 'zod'

const baseSchema = z.object({
  name: z.string().min(5).max(20),
  email: z.email().min(3).max(40),
  password: z.string().min(6).max(30),
  confirmPassword: z.string().min(6).max(30)
})

export const registerSchema = baseSchema.refine(
  data => data.password === data.confirmPassword,
  {
    message: "Passwords don't match",
    path: ['confirmPassword']
  }
)

export const loginSchema = baseSchema.pick({
  email: true,
  password: true,
})

export type RegisterSchemaType = z.infer<typeof registerSchema>
export type LoginSchemaType = z.infer<typeof loginSchema>