import { createClient } from "@/supabase/client"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import slugifyLib from "slugify";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string): string {
  if (typeof text !== "string") return "";

  return slugifyLib(text, {
    lower: true,      
    strict: true,     
    trim: true  
  });
}