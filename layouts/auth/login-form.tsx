"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { useRouter } from "next/navigation"
import { toast, Toaster } from "sonner"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { login } from "./auth.actions"
import { Loader2, HeartPulse } from "lucide-react"
import GradientButton from "@/components/ui/shared/GradientButton"
export const formSchema = z.object({
  email: z.email("valid email is required"),
  password: z.string().min(8,"password must be 8 characters or more")
})
export type FormValues = z.infer<typeof formSchema>

export  function LoginForm() {
  const { handleSubmit, control, formState} = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur"
  })
  const router = useRouter()
  async function onSubmit(data: FormValues) {
    const result = await login(data)
      if(result.success) {
        toast.success(result.message,{position: "top-right"})
        router.push("/dashboard")
      } else {
        return toast.error(result.message, {position: "top-right"})
      }
  }

return (
  <div className="relative min-h-screen w-full flex flex-col justify-center items-center bg-slate-950 text-white overflow-hidden px-4">
    <div className="w-full max-w-[420px] bg-slate-900/40 border border-white/10 p-8 sm:p-10 rounded-3xl backdrop-blur-md relative overflow-hidden space-y-8 shadow-2xl">
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="bg-rose-500/10 p-2.5 rounded-xl border border-rose-500/20 mb-1">
          <HeartPulse className="h-6 w-6 text-rose-500 animate-pulse" />
        </div>
        <span className="text-2xl font-black tracking-tight text-white select-none">
          ho<span className="text-rose-500">S</span>pital
        </span>
        <h1 className="text-2xl font-black text-white mt-1 tracking-tight">Login</h1>
      </div>
      <form className="flex flex-col gap-5 w-full" onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup className="gap-4">
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="flex-col gap-1.5">
                <FieldLabel htmlFor="email" className="text-slate-300 text-xs font-bold uppercase tracking-wider block">
                  Email Address
                </FieldLabel>
                <Input
                  {...field}
                  id="email"
                  aria-invalid={fieldState.invalid}
                  placeholder="example@example.io"
                  className="h-11 w-full 
                  bg-slate-950/60 border 
                  border-white/10 
                  focus:border-rose-500/50 
                  focus:ring-1 
                  focus:ring-rose-500/50 
                  rounded-xl px-4 
                  text-white 
                  text-sm 
                  transition-all 
                  outline-none 
                  placeholder:text-slate-600"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} className="text-xs font-medium text-rose-500 mt-1" />
                )}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="flex-col gap-1.5">
                <FieldLabel htmlFor="password" className="text-slate-300 text-xs font-bold uppercase tracking-wider block">
                  Password
                </FieldLabel>
                <Input
                  type="password"
                  {...field}
                  id="password"
                  aria-invalid={fieldState.invalid}
                  placeholder="••••••••"
                  className="
                  h-11 w-full 
                  bg-slate-950/60 
                  border 
                  border-white/10 
                  focus:border-rose-500/50 
                  focus:ring-1 
                  focus:ring-rose-500/50 
                  rounded-xl 
                  px-4 
                  text-white 
                  text-sm 
                  transition-all 
                  outline-none 
                  placeholder:text-slate-600"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} className="text-xs font-medium text-rose-500 mt-1" />
                )}
              </Field>
            )}
          />
          </FieldGroup>
          <GradientButton
            disabled={formState.isSubmitting} 
            type="submit"  
            className="
            w-full h-11
            mt-2"
          >
            {formState.isSubmitting ? <Loader2 className="animate-spin h-5 w-5" /> : "Sign In"}
          </GradientButton>
      </form>
    </div>
    <Toaster />
  </div>
  )
}

