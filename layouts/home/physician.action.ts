"use server"

import { db } from "@/db/database"
import { physicians } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function getPhysician(slug: string) {
    const physician = await db.query.physicians.findFirst({
        where: eq(physicians.slug, slug),
        with: {
            details: true,
            department: true
        }
    })
    return physician
}