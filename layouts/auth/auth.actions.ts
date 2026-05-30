"use server"

import { createSupabaseServerClient } from "@/supabase/server"
import { type FormValues } from "./login-form"
import { redirect } from "next/navigation"
export async function login(data: FormValues) {
    try {
        const supabase = await createSupabaseServerClient()
        const result = await supabase.auth.signInWithPassword({email: data.email, password: data.password})
        if(result.error && !result.data.user) {
            return {success: false, message: result.error.message}
        }
        return {success: true, message: "successful login"}
        } catch(e) {
            if(e instanceof Error){
                return {success: false, message: e.message}
            }
            return {success: false, message: "something went wrong"}
    }

}
export async function logout() {
    const supabase = await createSupabaseServerClient() 
    await supabase.auth.signOut()
    redirect("/auth")
 }