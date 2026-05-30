"use server"

import { db } from "@/db/database"
import { departments } from "@/db/schema"
import { eq } from "drizzle-orm"



export async function getDepartments() {
    const publichedDepartments = await db.select().from(departments).where(eq(departments.status, "on"))
    return publichedDepartments
}
export async function getOneDepartment(slug: string) {
    const department = await db.query.departments.findFirst({
        where: eq(departments.slug, slug),
        with: {
            details: true,
            physicians: true
        },
    })
    return department
}
