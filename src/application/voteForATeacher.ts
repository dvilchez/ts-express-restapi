import { Teachers } from "../domain/repos"
import { TotalVotes, Teacher, Email } from "../domain/model"

export class VoteForATeacher {
    constructor(private teachers: Teachers){}

    public async execute(voterEmail: string, teacherEmail: string) : Promise<TotalVotes> {
        
        const voter = await this.teachers.findOrCreate(new Teacher(Email.fromString(voterEmail)))
        const teacher = await this.teachers.findOrCreate(new Teacher(Email.fromString(teacherEmail)))

        teacher.addVote(voter)
        await this.teachers.save(teacher)

        return teacher.totalVotes()
    }
}
