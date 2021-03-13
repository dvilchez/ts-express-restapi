import { Teachers } from "../domain/repos"
import { TotalVotes, Teacher } from "../domain/model"

export class VoteForATeacher {
    constructor(private teachers: Teachers){}

    public async execute(voterEmail: string, teacherEmail: string) : Promise<TotalVotes> {
        
        const voter = await this.teachers.findOrCreate(new Teacher(voterEmail))
        const teacher = await this.teachers.findOrCreate(new Teacher(teacherEmail))

        teacher.addVote(voter)
        await this.teachers.save(teacher)

        return teacher.totalVotes()
    }
}
