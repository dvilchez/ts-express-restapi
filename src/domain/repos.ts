import { Course, Teacher } from "./model";

export interface Teachers {
    findOrCreate(teacher: Teacher): Promise<Teacher>
    save(course: Teacher): Promise<void>
}

export interface Courses {
    findOrCreate(course: Course): Promise<Course>
    save(course: Course): Promise<void>
}