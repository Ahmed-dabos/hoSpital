"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller ,useForm } from "react-hook-form"
import { departmentFormSchema, type DepartmentFormValues } from "./department.dto"
import { toast, Toaster } from "sonner"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2, PlusCircle, Upload, FileImage, X } from "lucide-react"
import { addDepartment } from "./dashboard.server"
import { uploadPhoto } from "@/lib/utils"
import { useState } from "react"
import GradientButton from "@/components/ui/shared/GradientButton"
import Tiptap from "@/components/tiptap/tiptap"

export function AddDepartmentForm() {
  const [fileKey, setFileKey] = useState(0)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const {handleSubmit, control, formState, reset} = useForm({
    defaultValues: {
      name: "",
      details: "",
      equipments: "",
      faq: "",
      services: ""
    },
    resolver: zodResolver(departmentFormSchema),
    mode: "onBlur"
  })

  async function onSubmit(_data: DepartmentFormValues) {
    const result  = await uploadPhoto(_data.img, "departments")
    if(!result.publicUrl) {
      return toast.error(result.message)
    }
    const data = await addDepartment(result.publicUrl, _data)
    if(!data?.success) {
      return toast.error(data?.message)
    }
    toast.success(data.message)
    reset()
    setFileKey(prev => prev + 1)
    setSelectedFile(null)
  }

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
            <PlusCircle className="h-8 w-8 text-rose-500" />
            Add Department
          </h1>
          <p className="text-sm font-light text-slate-400 mt-1">
            Create a new clinical department, configure its custom details, and upload high-resolution cover graphics.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md p-6 md:p-8 hover:border-rose-500/20 transition-all duration-300">
        <form className="flex flex-col gap-6 w-full" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup className="gap-6">
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="flex-col gap-2">
                  <label htmlFor="name" className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    department name:
                  </label>
                  <Input
                    {...field}
                    id="name"
                    placeholder="e.g. Cardiology & Cardiovascular Surgery"
                    aria-invalid={fieldState.invalid}
                    className="
                    h-11 w-full 
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
                    placeholder:text-slate-600
                    "
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} className="text-xs font-medium text-rose-500 mt-1" />
                  )}
                </Field>
              )}
            />

            <Controller
              name="img"
              control={control}
              render={({ field: { onChange, onBlur, name, ref }, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="flex-col gap-2 w-full">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    department cover image:
                  </label>
                  <FieldLabel
                    htmlFor="uploadImg"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault()
                      const file = e.dataTransfer.files?.[0]
                      if (file) {
                        setSelectedFile(file)
                        onChange(file)
                      }
                    }}
                    className="
                      flex flex-col items-center justify-center
                      h-44 w-full
                      rounded-xl
                      border-2 border-dashed border-white/10
                      bg-slate-950/40 hover:bg-slate-950/60
                      hover:border-rose-500/40
                      transition-all duration-300
                      cursor-pointer
                      text-slate-400 hover:text-slate-200
                      gap-3 group
                      p-6
                      "
                  >
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:border-rose-500/20 group-hover:bg-rose-500/10 transition-all duration-300">
                      <Upload className="h-6 w-6 text-slate-400 group-hover:text-rose-400 transition-colors duration-300" />
                    </div>
                    <div className="text-center">
                      <span className="text-sm font-semibold tracking-wide block">
                        Upload Department Cover Image
                      </span>
                      <span className="text-xs text-slate-500 mt-1 block">
                        Drag and drop or click to browse (supports JPG, PNG, WEBP)
                      </span>
                    </div>
                  </FieldLabel>
                  <Input
                    hidden
                    type="file"
                    key={fileKey}
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        setSelectedFile(file)
                        onChange(file)
                      }
                    }}
                    onBlur={onBlur}
                    name={name}
                    ref={ref}
                    id="uploadImg"
                  />

                  {selectedFile ? (
                    <div className="mt-3 flex items-center gap-3 p-3.5 rounded-xl border border-white/5 bg-slate-950/50 animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div className="p-2 bg-rose-500/10 rounded-lg border border-rose-500/20">
                        <FileImage className="h-5 w-5 text-rose-400 shrink-0" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                          {selectedFile.name}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg cursor-pointer transition-all border border-transparent hover:border-rose-500/20"
                        onClick={() => {
                          setSelectedFile(null)
                          onChange(null)
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : null}

                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                      className="text-xs font-medium text-rose-500 mt-1"
                    />
                  )}
                </Field>
              )}
            />

            <Controller
              name="details"
              control={control}
              render={({field: { onChange },fieldState}) => {
                return (
                  <div className="flex flex-col gap-2 w-full">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                      department details:
                    </label>
                    <Tiptap onChange={onChange} placeHolder="Write detailed department overview, history, and medical vision..."/>
                    {fieldState.error ? (
                      <p className="text-xs font-medium text-rose-500 mt-1">{fieldState.error?.message}</p>
                    ) : null}
                  </div>
                )
              }}
            />

            <Controller
              name="services"
              control={control}
              render={({field: { onChange },fieldState}) => {
                return (
                  <div className="flex flex-col gap-2 w-full">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                      department services:
                    </label>
                    <Tiptap onChange={onChange} placeHolder="Write detailed information about key treatments and medical services..."/>
                    {fieldState.error ? (
                      <p className="text-xs font-medium text-rose-500 mt-1">{fieldState.error?.message}</p>
                    ) : null}
                  </div>
                )
              }}
            />

            <Controller
              name="equipments"
              control={control}
              render={({field: { onChange },fieldState}) => {
                return (
                  <div className="flex flex-col gap-2 w-full">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                      department equipments:
                    </label>
                    <Tiptap onChange={onChange} placeHolder="Write details about the clinical technologies and medical equipment..."/>
                    {fieldState.error ? (
                      <p className="text-xs font-medium text-rose-500 mt-1">{fieldState.error?.message}</p>
                    ) : null}
                  </div>
                )
              }}
            />

            <Controller
              name="faq"
              control={control}
              render={({field: { onChange },fieldState}) => {
                return (
                  <div className="flex flex-col gap-2 w-full">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                      FAQ:
                    </label>
                    <Tiptap onChange={onChange} placeHolder="Write frequently asked questions and answers for patients..."/>
                    {fieldState.error ? (
                      <p className="text-xs font-medium text-rose-500 mt-1">{fieldState.error?.message}</p>
                    ) : null}
                  </div>
                )
              }}
            />
          </FieldGroup>
          
          <GradientButton 
            disabled={formState.isSubmitting} 
            type="submit"  
            className="w-full h-11 mt-2"
          >
            {formState.isSubmitting ? (
              <div className="flex items-center gap-2">
                <Loader2 className="animate-spin h-5 w-5" />
                <span>adding department...</span>
              </div>
            ) : "add department"}
          </GradientButton>
        </form>
      </div>
      <Toaster />
    </div>
  )
}
