"use server"

import { db } from "@/db/database"
import { departmentDetails, departments, physicians, physicianDetails } from "@/db/schema"
import { eq } from "drizzle-orm"
import { PhysicianFormValues, type DepartmentFormValues } from "./department.dto"
import { slugify } from "@/lib/utils"
import { revalidatePath } from "next/cache"


export async function getDepartmentsOverview() {
    const department = await db.query.departments.findMany()
    return department
}

export async function addDepartment(publicUrl: string  ,data: DepartmentFormValues) {
    try {
        const department = await db.insert(departments).values({
            name: data.name,
            slug: slugify(data.name),
            imgUrl: publicUrl,
            status: "on"
        }).returning({id: departments.id})
        const content = {details: data.details, services: data.services, faq: data.faq, equipments: data.equipments }
        const _departmentDetails = await db.insert(departmentDetails).values({
            content,
            departmentId: department[0].id
            
        })
        if(!department || !_departmentDetails) {
            throw new Error("faild to add department")
        }
        revalidatePath("/")
        revalidatePath("/dashboard")
        revalidatePath("/dashboard/add-physician")
        return {success: true, message:"added department successfully"}
    }
    catch(e) {
        if(e instanceof Error){
        return {success: false, message: e.message}
    }
    return { success: false, message: "something went wrong"}
    }
}

export async function deleteDepartment(id: number) {
    await db.delete(departments).where(eq(departments.id, id))
    revalidatePath("/dashboard")
    revalidatePath("/")
    revalidatePath("/dashboard/add-physician")
}

export async function toggleArchive(id:number) {
    const department = await db.select().from(departments).where(eq(departments.id,id))
    if(department[0].status === "on") {
        await db.update(departments).set({status: "archive"}).where(eq(departments.id, id))
        revalidatePath("/dashboard")
        revalidatePath("/")
    }else {

        await db.update(departments).set({status: "on"}).where(eq(departments.id, id))
        revalidatePath("/dashboard")
        revalidatePath("/")
    }
    
    
}

export async function addphysician(publicUrl: string  ,data: PhysicianFormValues) {
    try {
        const physician = await db.insert(physicians).values({
            name: data.name,
            slug: slugify(data.name),
            imgUrl: publicUrl,
            departmentId: Number(data.departmentId),
            title: data.jobTitle
            
        }).returning({id: physicians.id})
        const content = {Experiences: data.Experiences }
        const _physicianDetails = await db.insert(physicianDetails).values({
            content,
            physicianId: physician[0].id
        })
        if(!physician|| !_physicianDetails) {
            throw new Error("faild to add physician")
        }
        revalidatePath("/")
        revalidatePath("/dashboard")
        return {success: true, message:"added physician successfully"}
    }
    catch(e) {
        if(e instanceof Error){
        return {success: false, message: e.message}
    }
    return { success: false, message: "something went wrong"}
    }
}