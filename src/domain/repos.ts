import { Course, Teacher } from "./model";

export interface Teachers {
    findOrCreate(teacherEmail: string): Promise<Teacher>
}

export interface Courses {
    findOrCreate(courseTitle: string): Promise<Course>
}