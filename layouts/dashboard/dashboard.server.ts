"use server"

import { db } from "@/db/database"
import { departmentDetails, departments, physicians, physicianDetails, } from "@/db/schema"
import { eq } from "drizzle-orm"
import { PhysicianFormValues, type DepartmentFormValues } from "./department.dto"
import { slugify} from "@/lib/utils"
import { revalidatePath } from "next/cache"
import { createSupabaseServerClient } from "@/supabase/server"
import { redirect } from "next/navigation"


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
    const imgUrl = await db.delete(departments).where(eq(departments.id, id)).returning({imgUrl: departments.imgUrl})
    await deletImage(imgUrl[0].imgUrl, "departments")
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

export async function getPhysicians() {
    const physicians = await db.query.physicians.findMany({
        with: {
            department: true
        }
    }) 
        return physicians
}
export async function deletePhysician(id: number) {
    const imgUrl = await db.delete(physicians).where(eq(physicians.id, id)).returning({imgUrl: physicians.imgUrl})
    await deletImage(imgUrl[0].imgUrl, "physicians")
    revalidatePath("/dashboard")
    revalidatePath("/")
    revalidatePath("/dashboard/add-physician")
}

export async function deletImage(imgUrl: string,bucket: string, id?: number,) {
    const imgPath = imgUrl.split(`/${bucket}/`)[1]
    const supabase = await createSupabaseServerClient()
    await supabase.storage.from(bucket).remove([imgPath])
    if(id) {
        if(bucket === "departments") {
        const slug =   await db.update(departments).set({
                imgUrl: "empty"
            }).where(eq(departments.id,id)).returning({slug: departments.slug})
                revalidatePath("/")
                revalidatePath("/dashboard")
                revalidatePath(`/dashboard/edit-departments/${slug[0].slug}`)
        }else {
          const slug =   await db.update(physicians).set({
                imgUrl: "empty"
            }).where(eq(physicians.id,id)).returning({slug: physicians.slug})
                revalidatePath("/")
                revalidatePath("/dashboard")
                revalidatePath(`/dashboard/edit-physicians/${slug[0].slug}`)
        }
    } 

    
}
export async function uploadPhoto(file: File,bucket: string) {
  try {

    const supabase = await createSupabaseServerClient()
    const path = `${new Date().getMinutes()}${Math.random()}/${file.name}`
    const upload = await supabase.storage.from(bucket).upload(path, file,{
      cacheControl: '3600',
      upsert: false
  })
  if(upload.error) {
    throw new Error(upload.error.message)
  }
    const {data: {publicUrl}} = await supabase.storage.from(bucket).getPublicUrl(path)
      return {publicUrl, message: "uploaded"}
  } catch(e){
      if(e instanceof Error) {
        return {publicUrl: null, message: e.message}
      }
      return {publicUrl: null, message: "something went wrong"}
  }
}

export async function editDepartment(id: number, data: DepartmentFormValues, imgUrl: string) {

    if(data.img) {
        const imgUrl = await uploadPhoto(data.img, "departments")
        const slug = await db.update(departments).set({
            name: data.name,
            slug: slugify(data.name), 
            imgUrl: imgUrl.publicUrl as string
        }).where(eq(departments.id, id)).returning({slug: departments.slug})
        const content = {details: data.details, services: data.services, faq: data.faq, equipments: data.equipments}
        const _departmentDetails = await db.update(departmentDetails).set({
            content: content
        }).where(eq(departmentDetails.departmentId, id))
        if(!slug[0].slug || !_departmentDetails) {
            return {success: false, message: "something went wrong"}
        }   else {
                revalidatePath("/dashboard")
            revalidatePath(`/dashboard/edit-department/${slug[0].slug}`)
            return {success: true, message: "updated department successfully"}
        }
    } 
    
    else {
        const slug = await db.update(departments).set({
            name: data.name,
            slug: slugify(data.name),
            imgUrl: imgUrl
        }).where(eq(departments.id, id)).returning({slug: departments.slug})
        const content = {details: data.details, services: data.services, faq: data.faq, equipments: data.equipments}
        const _departmentDetails = await db.update(departmentDetails).set({
        content: content
    }).where(eq(departmentDetails.departmentId, id)).returning({departmentId: departmentDetails.departmentId})
    if(!slug[0].slug || !_departmentDetails) {
        return {success: false, message: "something went wrong"}
    } else {
            revalidatePath("/dashboard")
            revalidatePath(`/dashboard/edit-department/${slug[0].slug}`)
        return {success: true, message: "updated department successfully"}
    }
    }
}

export async function editPhysician(id: number, data: PhysicianFormValues, imgUrl: string) {

    if(data.img) {
        const imgUrl = await uploadPhoto(data.img, "physicians")
        const slug = await db.update(physicians).set({
            name: data.name,
            slug: slugify(data.name), 
            imgUrl: imgUrl.publicUrl as string
        }).where(eq(physicians.id, id)).returning({slug: physicians.slug})
        const content = {Experiences: data.Experiences}
        const _physicianDetails = await db.update(physicianDetails).set({
            content: content
        }).where(eq(physicianDetails.physicianId, id))
        if(!slug || !_physicianDetails) {
            return {success: false, message: "something went wrong"}
        }   else {
                revalidatePath("/dashboard")
            revalidatePath(`/dashboard/edit-physician/${slug[0].slug}`)
            return {success: true, message: "updated physician successfully"}
        }
    } 
    
    else {
        const slug = await db.update(physicians).set({
            name: data.name,
            slug: slugify(data.name),
            imgUrl: imgUrl
        }).where(eq(physicians.id, id)).returning({slug: physicians.slug})
        const content = {Experiences: data.Experiences}
        const _physicianDetails = await db.update(physicianDetails).set({
        content: content
    }).where(eq(physicianDetails.physicianId, id)).returning({physicianId: physicianDetails.physicianId})
    if(!slug[0].slug || !_physicianDetails) {
        return {success: false, message: "something went wrong"}
    } else {
            revalidatePath("/dashboard")
            revalidatePath(`/dashboard/edit-physician/${slug[0].slug}`)
        return {success: true, message: "updated physician successfully"}
    }
    }
}