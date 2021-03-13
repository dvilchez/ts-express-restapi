import { RegistrationAlreadyExists } from "../domain/exceptions"
import { Courses, Teachers } from "../domain/repos"
import { Registration } from "./dtos"

export class MakeANewRegistration {
    constructor(private courses: Courses, private teachers: Teachers){}

    public execute(teacherEmail: string, courseTitle: string) : Registration {
        
        const teacher = this.teachers.findOrCreate(teacherEmail)
        const course = this.courses.findOrCreate(courseTitle)

        if(course.hasBeenProposedBy(teacher)) {
            throw new RegistrationAlreadyExists()
        }

        return {} 
    }
}