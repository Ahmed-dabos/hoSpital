import { getAuthContext } from "@/actions/actions"
import AddedDepartments from "./added-departments";

export async function DashboardOverviewPage() {
    const user = await getAuthContext()
    return (
        <div className="p-6 md:p-10 max-w-7xl mx-auto w-full">
            <AddedDepartments />
        </div>
    )
}

