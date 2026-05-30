import { pgTable, text, serial, jsonb, integer, pgEnum } from "drizzle-orm/pg-core";

export const status = pgEnum("status", ["on", "archive"])
export const departments = pgTable("departments",{
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    imgUrl: text("img_url").notNull(),
    status: status().notNull()
}).enableRLS()
export const physicians = pgTable("physicians", {
    id: serial("id").primaryKey(),
    departmentId: integer("department_id").references(() => departments.id, {onDelete: "cascade"}).notNull(),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    imgUrl: text("img_url").notNull()
}).enableRLS()

export const departmentDetails = pgTable("department_details",{
    departmentId: integer("department_id").references(() => departments.id, {onDelete: "cascade"}).notNull().primaryKey(),
    content: jsonb("content").notNull(),
    metadata: jsonb("metadata")
}).enableRLS()
export const physicianDetails = pgTable("physician_details",{
    physicianId: integer("physician_id").references(() => physicians.id, {onDelete: "cascade"}).notNull().primaryKey(),
    content: jsonb("content").notNull(),
    metadata: jsonb("metadata")
}).enableRLS()