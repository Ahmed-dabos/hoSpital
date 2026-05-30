import { createClient } from "@/supabase/client"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import slugifyLib from "slugify";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export async function uploadPhoto(file: File,bucket: string) {
  try {

    const supabase = await createClient()
    const path = `${new Date().getMinutes()}/${file.name}`
    const upload = await supabase.storage.from(bucket).upload(path, file,{
      cacheControl: '3600',
      upsert: false
  })
  if(upload.error) {
    throw new Error(upload.error.message)
  }
    const {data: {publicUrl}} = await supabase.storage.from("departments").getPublicUrl(path)
      return {publicUrl, message: "uploaded"}
  } catch(e){
      if(e instanceof Error) {
        return {publicUrl: null, message: e.message}
      }
      return {publicUrl: null, message: "something went wrong"}
  }
}
export function slugify(text: string): string {
  if (typeof text !== "string") return "";

  return slugifyLib(text, {
    lower: true,      
    strict: true,     
    trim: true  
  });
}