import { getOneDepartment, getDepartments } from "@/layouts/home/departments.actions";
export async function generateStaticParams() {
    const departments = await getDepartments()
    const slugs = departments.map(department => ({slug: department.slug}))
    return slugs
}
export default async function department({params}:{params: Promise<{slug: string}>}) {
    const { slug } = await params
    const department = await getOneDepartment(slug)
    return (
        <main className="mt-25 text-white">
                <p>{department?.name}</p>
        </main>
    );
}