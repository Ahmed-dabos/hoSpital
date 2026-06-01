"use client" 
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller ,useForm } from "react-hook-form"
import { physicianFormSchema, type PhysicianFormValues } from "./department.dto"
import { toast, Toaster } from "sonner"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2, PlusCircle, Upload, FileImage, X, Pencil, Pyramid } from "lucide-react"
import {  addphysician, deletImage } from "./dashboard.server"
import { uploadPhoto } from "./dashboard.server"
import { useState } from "react"
import GradientButton from "@/components/ui/shared/GradientButton"
import Tiptap from "@/components/tiptap/tiptap"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from "next/link"
import { EditPhysicianForm } from "@/app/(auth)/dashboard/edit-physician/[slug]/page"
import { editPhysician } from "./dashboard.server"
export function AddEditPhysicianForm({departments, physician}: {departments: { id: number, name: string}[], physician?: EditPhysicianForm}) {
    const [fileKey, setFileKey] = useState(0)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
  
    const {handleSubmit, control, formState, reset} = useForm({
      defaultValues: {
      name: physician? physician.name : "",
      departmentId: physician? physician.departmentId :  "",
      jobTitle: physician? physician.jobTitle :  "",
      age: "",
      Experiences:physician? physician.Experiences : ""
      },
      resolver: zodResolver(physicianFormSchema),
      mode: "onBlur"
    })
    if(!departments.length) {
        return (
          <div className="flex flex-col items-center justify-center p-8 max-w-md mx-auto text-center space-y-6 mt-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="p-4 bg-rose-500/10 rounded-full border border-rose-500/20 text-rose-500">
              <PlusCircle className="h-10 w-10 animate-pulse" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-white">No Departments Found</h2>
              <p className="text-sm text-slate-400 max-w-xs mx-auto leading-relaxed">
                You must add at least one department first before you can register and assign a physician.
              </p>
            </div>
            <Link 
              href={"/dashboard/add-department"} 
              className="inline-flex items-center justify-center h-10 px-6 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 shadow-lg shadow-rose-500/25 transition-all duration-300 hover:scale-[1.02]"
            >
              Add Department
            </Link>
          </div>
        )
    }
    
      async function onSubmit(_data: PhysicianFormValues) {
        if(!physician) {
          if(!_data.img) {
            return toast.error("please upload a photo")
          }
          const result  = await uploadPhoto(_data.img, "physicians")
          if(!result.publicUrl) {
            return toast.error(result.message)
          }
          const data = await addphysician(result.publicUrl, _data)
          if(!data?.success) {
            return toast.error(data?.message)
          }
          toast.success(data.message)
          reset()
          setFileKey(prev => prev + 1)
          setSelectedFile(null)
      } else {
        if(!_data.img && physician.imgUrl ==="empty") {
          return toast.error("please upload a photo")
        } else {
          const data = await editPhysician(physician.id,_data,physician.imgUrl)
          if(!data.success) {
            return toast.error(data.message)
          } else {
          toast.success(data.message)
          setFileKey(prev => prev + 1)
          setSelectedFile(null)
          }
        }
      }
      }
    
      return (
        <div className="p-6 md:p-10 max-w-4xl mx-auto w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-white/5 pb-6">
            <div>
              <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
                {physician? <Pencil className="h-8 w-8 text-rose-500" />:<PlusCircle className="h-8 w-8 text-rose-500" />}
                {physician? "edit ":"add" } Physician
              </h1>
              <p className="text-sm font-light text-slate-400 mt-1">
               {physician? "edit physician": "Add a new physician to our clinical departments"} 
              </p>
            </div>
          </div>
    
          <div className="rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md p-6 md:p-8 hover:border-rose-500/20 transition-all duration-300">
            <form className="flex flex-col gap-6 w-full" onSubmit={handleSubmit(onSubmit)}>
              <FieldGroup className="gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Controller
                    name="name"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid} className="flex-col gap-2">
                        <label htmlFor="name" className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                          Physician Name
                        </label>
                        <Input
                          {...field}
                          id="name"
                          placeholder="e.g. John Doe"
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
                    name="jobTitle"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid} className="flex-col gap-2">
                        <label htmlFor="jobTitle" className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                          Job Title
                        </label>
                        <Input
                          {...field}
                          id="jobTitle"
                          placeholder="e.g. Assistant Lecturer"
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Controller
                    name="age"
                    control={control}
                    render={({field,fieldState}) => (
                      <Field data-invalid={fieldState.invalid} className="flex-col gap-2">
                        <label htmlFor="age" className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                          Physician Age
                        </label>
                        <Input
                          {...field}
                          id="age"
                          type="number"
                          placeholder="e.g. 38"
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
                    name="departmentId"
                    control={control}
                    render={({field,fieldState}) => (
                      <Field data-invalid={fieldState.invalid} className="flex-col gap-2">
                        <label htmlFor="departmentId" className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                          Physician Department
                        </label>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                          name={field.name}
                        >
                          <SelectTrigger className="
                            h-11 w-full 
                            bg-slate-950/60 border 
                            border-white/10 
                            focus:ring-1 
                            rounded-xl px-4 
                            text-white 
                            text-sm 
                            transition-all 
                            outline-none
                            text-left
                            flex justify-between items-center
                          ">
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-950 border border-white/10 rounded-xl text-white">
                            <SelectGroup>
                              <SelectLabel className="text-slate-500 text-xs px-2 py-1.5 font-bold uppercase tracking-wider">Departments</SelectLabel>
                              {departments.map(department => (
                                <SelectItem key={department.id} value={String(department.id)} className="text-sm text-slate-300  focus:text-white rounded-lg cursor-pointer transition-colors duration-150 py-2 px-2 outline-none">
                                  {department.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} className="text-xs font-medium text-rose-500 mt-1" />
                        )}
                      </Field>
                    )}
                  />
                </div>

                <Controller
                  name="img"
                  control={control}
                  render={({ field: { onChange, onBlur, name, ref }, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="flex-col gap-2 w-full">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                        Physician Image
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
                            Upload Physician Image
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
                      ) : physician && physician.imgUrl !== "empty" ? (
                        <div className="relative h-44 w-full rounded-xl border border-white/10 bg-slate-950/40 overflow-hidden group/img-preview animate-in fade-in duration-300">
                          <img
                            src={physician.imgUrl}
                            alt="Current physician profile"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[2px] transition-all duration-300 group-hover/img-preview:bg-slate-950/40 group-hover/img-preview:backdrop-blur-sm" />
                          <div className="absolute inset-0 flex flex-col justify-between p-4 z-10">
                            <div className="flex justify-between items-start">
                              <div className="bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 text-[10px] font-bold text-rose-400 uppercase tracking-wider">
                                Current Profile Image
                              </div>
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                className="gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 hover:border-rose-500/30 cursor-pointer backdrop-blur-md shadow-md transition-all duration-300 hover:scale-102 active:scale-98"
                                onClick={async () => {
                                  await deletImage(physician.imgUrl, "physicians", physician.id);
                                  setSelectedFile(null);
                                  onChange(null);
                                }}
                              >
                                <X className="h-3.5 w-3.5" />
                                Delete Image
                              </Button>
                            </div>
                            <div className="bg-slate-950/80 backdrop-blur-md p-3 rounded-lg border border-white/5 max-w-xs transition-all duration-300 group-hover/img-preview:border-rose-500/20">
                              <p className="text-xs font-semibold text-white truncate">
                                {physician.name}
                              </p>
                              <p className="text-[10px] text-slate-400 mt-0.5">
                                {physician.jobTitle || "Active clinical physician profile"}
                              </p>
                            </div>
                          </div>
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
                  name="Experiences"
                  control={control}
                  render={({field: { onChange },fieldState}) => {
                    return (
                      <div className="flex flex-col gap-2 w-full">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                          Experiences
                        </label>
                        <Tiptap value={physician? physician.Experiences: null} onChange={onChange} placeHolder="work experiences"/>
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
                    <span>{physician? "editing physician...":"adding physician..."}</span>
                  </div>
                ) : <span>{physician? "edit physician":"add physician"}</span>}
              </GradientButton>
            </form>
          </div>
          <Toaster />
        </div>
      )
}