"use server"

import { createSupabaseServerClient } from "@/supabase/server"
import { redirect } from "next/navigation"

export async function getAuthContext() {
    const supabase = await createSupabaseServerClient()
    const { data :{ user } } = await supabase.auth.getUser()
    if(!user) {
        redirect("/auth")
    }
    return user
}