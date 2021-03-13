import { RegistrationAlreadyExists } from "../domain/exceptions"
import { Courses, Teachers } from "../domain/repos"
import { Registration } from "../domain/model"

export class MakeANewRegistration {
    constructor(private courses: Courses, private teachers: Teachers){}

    public async execute(teacherEmail: string, courseTitle: string) : Promise<Registration> {
        
        const teacher = await this.teachers.findOrCreate(teacherEmail)
        const course = await this.courses.findOrCreate(courseTitle)

        if(course.hasBeenProposedBy(teacher)) {
            throw new RegistrationAlreadyExists()
        }

        course.addProponent(teacher)
        await this.courses.save(course)

        return course.toRegistration(teacher)
    }
}