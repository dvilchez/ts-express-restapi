import { Courses, Teachers } from "../domain/repos"
import { Course, Email, Registration, Teacher } from "../domain/model"

export class MakeANewRegistration {
    constructor(private courses: Courses, private teachers: Teachers){}

    public async execute(teacherEmail: string, courseTitle: string) : Promise<Registration> {
        
        const teacher = await this.teachers.findOrCreate(new Teacher(Email.fromString(teacherEmail)))
        const course = await this.courses.findOrCreate(new Course(courseTitle))

        course.addProponent(teacher)
        await this.courses.save(course)

        return course.toRegistration(teacher)
    }
}