import { RegistrationAlreadyExists, TeacherIsNotAProponent, VoteIsRepeated } from "../exceptions"
import { Registration } from "./registration"
import { Teacher } from "./teacher"
import { TotalVotes } from "./totalVotes"

export class Course {
    private teachers: Teacher[] = []
    private voters: Teacher[] = []

    constructor(private title: string){}

    public hasBeenProposedBy(teacher: Teacher) : boolean {
        return this.teachers.some(t => teacher.equal(t))
    }

    public addVote(voter: Teacher) : void {
        if(this.hasBeenVotedBy(voter)){
            throw new VoteIsRepeated(voter.toString(), this.toString())
        }

        this.voters = [...this.voters, voter]
    }

    public hasBeenVotedBy(voter: Teacher): boolean {
        return this.voters.some(v => voter.equal(v))
    }

    public totalVotes(): TotalVotes {
        return this.voters.length
    }

    public addProponent(teacher: Teacher) : void {
        if(this.hasBeenProposedBy(teacher)){
            throw new RegistrationAlreadyExists()
        }

        this.teachers = [...this.teachers, teacher]
    }

    public toRegistration(teacher: Teacher) : Registration {
        if(!this.hasBeenProposedBy(teacher)){
            throw new TeacherIsNotAProponent(teacher.toString(), this.title)
        }

        return {
            course: this.title, 
            teacher: teacher.toString(), 
            courseVotes: this.totalVotes(), 
            teacherVotes:teacher.totalVotes()
        }
    }

    public toRegistrations() : Registration[] {
        return this.teachers.map(t => this.toRegistration(t))
    }

    public equal (course: Course): boolean{
        return course.title === this.title
    }

    public toString () : string {
        return this.title
    }
}
