import { z } from "zod"
export const departmentFormSchema = z.object({
    name: z.string().nonempty("must provide name"),
    img: z.file("must provide a photo"),
    details: z.string("must provide a value").min(20, "must be more than 20 characters"),
    faq: z.string("must provide a value").min(20, "must be more than 20 characters"),
    services: z.string("must provide a value").min(20, "must be more than 20 characters"),
    equipments: z.string("must provide a value").min(20, "must be more than 20 characters")
})

export type DepartmentFormValues = z.infer<typeof departmentFormSchema>

export const physicianFormSchema = z.object({
    name: z.string("must provid a name").nonempty(),
    departmentId: z.string("please choose a deparment"),
    img: z.file("must provide a photo"),
    jobTitle: z.string("must provide a job title").nonempty(),
    age: z.string().nonempty(),
    Experiences: z.string().nonempty()
})
export type PhysicianFormValues = z.infer<typeof physicianFormSchema>