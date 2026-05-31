import { getAuthContext } from "@/actions/actions"
import DepartmentsOverview from "./departments-overview";

export async function DashboardOverviewPage() {
    const user = await getAuthContext()
    return (
        <div className="p-6 md:p-10 max-w-7xl mx-auto w-full">
            <DepartmentsOverview />
        </div>
    )
}

