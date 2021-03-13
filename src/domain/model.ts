import { Teachers } from "../infrastructure/inMemoryRepos";
import { RegistrationAlreadyExists, TeacherIsNotAProponent, VoteIsRepeated } from "./exceptions";

export type Registration = {
    course: string,
    teacher: string
}

export type Vote = {
}
export class Teacher {
    private voters: Teacher[] = []
    constructor(private email: string){}

    addVote(voter: Teacher) : void {
        if(this.hasBeenVotedBy(voter)){
            throw new VoteIsRepeated(voter.toString(), this.toString())
        }

        this.voters = [...this.voters, voter]
    }

    hasBeenVotedBy(voter: Teacher): boolean {
        return this.voters.some(v => voter.equal(v))
    }

    public equal (teacher: Teacher): boolean{
       return teacher.email === this.email
    }

    public toString () : string {
        return this.email
    }
}

export class Course {
    private teachers: Teacher[] = []

    constructor(private title: string){}

    public hasBeenProposedBy(teacher: Teacher) : boolean {
        return this.teachers.some(t => teacher.equal(t))
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

        return {course: this.title, teacher: teacher.toString()}
    }

    public equal (course: Course): boolean{
        return course.title === this.title
    }
}