import { AddEditPhysicianForm } from "@/layouts/dashboard"
import { getDepartmentsOverview } from "@/layouts/dashboard"
export default async function AddPhysician() {
    const departments = await getDepartmentsOverview()
    const departmentsArray = departments.map(department => ({
        id: department.id,
        name: department.name
    }))
    return <AddEditPhysicianForm departments={departmentsArray} />
}