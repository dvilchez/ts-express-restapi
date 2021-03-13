import { Teachers, Courses } from "../domain/repos"
import { TotalVotes, Teacher, Email, Course } from "../domain/model"

export class VoteForACourse {
    constructor(private teachers: Teachers, private courses: Courses){}

    public async execute(voterEmail: string, courseTitle: string) : Promise<TotalVotes> {
        
        const voter = await this.teachers.findOrCreate(new Teacher(Email.fromString(voterEmail)))
        const course = await this.courses.findOrCreate(new Course(courseTitle))

        course.addVote(voter)
        await this.courses.save(course)

        return course.totalVotes()
    }
}
