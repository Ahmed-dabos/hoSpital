import { AddEditPhysicianForm } from "@/layouts/dashboard";
import { getDepartments, getPhysician } from "@/layouts/home";
import { permanentRedirect } from "next/navigation";

export type EditPhysicianForm = {
    name: string,
    age?: string,
    departmentId: string
    jobTitle: string
    Experiences: string
    imgUrl: string
    id: number
}
export default async function EditPhysician({params}: {params: Promise<{slug: string}>}) {
    const {slug} = await params
    const physician = await getPhysician(slug)
    const departments = await getDepartments()
    if(!physician) {
        permanentRedirect("/dashboard")
    }
    const physicianEditValues: EditPhysicianForm = {
        name: physician?.name,
        departmentId: String(physician.departmentId),
        jobTitle: physician.title,
        Experiences: physician.details?.content?.Experiences as string,
        imgUrl: physician.imgUrl,
        id: physician.id
    }
    return (
        <AddEditPhysicianForm departments={departments} physician={physicianEditValues} />
    )
}