import { Course, Teacher } from "./model";

export interface Teachers {
    findOrCreate(teacherEmail: string): Teacher
}

export interface Courses {
    findOrCreate(courseTitle: string): Course
}