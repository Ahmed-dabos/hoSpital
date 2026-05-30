import { relations } from "drizzle-orm";
import { departmentDetails, departments, physicianDetails, physicians } from "./schema";

export const physiciansRelation = relations(physicians, ({one}) => {
    return {
            department : one(departments, {
            fields: [physicians.departmentId],
            references: [departments.id]
        }),
        details: one(physicianDetails),
    }
})
export const departmentsRelations = relations(departments, ({one, many}) => {
    return {
        details: one(departmentDetails),
        physicians: many(physicians)
    }
})
export const physicianDetailsRelations = relations(physicianDetails, ({one}) => {
    return {
        physician: one(physicians, {
            fields: [physicianDetails.physicianId],
            references: [physicians.id]
        })
    }
})

export const departmentDetailsRelations = relations(departmentDetails, ({one}) => {
    return {
        department: one(departments, {
            fields: [departmentDetails.departmentId],
            references: [departments.id]
        })
    }
})