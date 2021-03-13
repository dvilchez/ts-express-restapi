import { RegistrationAlreadyExists } from "../domain/exceptions"
import { Courses, Teachers } from "../domain/repos"
import { Registration } from "./dtos"

export class MakeANewRegistration {
    constructor(private courses: Courses, private teachers: Teachers){}

    public async execute(teacherEmail: string, courseTitle: string) : Promise<Registration> {
        
        const teacher = await this.teachers.findOrCreate(teacherEmail)
        const course = await this.courses.findOrCreate(courseTitle)

        if(course.hasBeenProposedBy(teacher)) {
            throw new RegistrationAlreadyExists()
        }

        return {} 
    }
}