
import { AddEditDepartmentForm } from "@/layouts/dashboard"
import { DepartmentFormValues } from "@/layouts/dashboard/department.dto"
import { getOneDepartment } from "@/layouts/home"
import { redirect } from "next/navigation"
export type EditDepartmentForm = Omit<DepartmentFormValues,"img"> & {
  imgUrl: string,
  id: number
 }
export default async function EditDialog({params}: { params: Promise<{slug: string}>}) {
   const {slug} = await params
   const department = await getOneDepartment(slug)
   if(!department?.details?.content) {
    return redirect("/dashboard")
   }
   const departmentFormValues: EditDepartmentForm= {
    name: department?.name,
    details: department.details?.content?.details,
    services: department.details.content.services,
    equipments: department.details.content.equipments,
    faq: department.details.content.faq,
    imgUrl: department.imgUrl,
    id: department.id
   }
  return (
    <AddEditDepartmentForm  department={departmentFormValues} />
  )
}