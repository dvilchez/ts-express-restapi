import { InvalidEmailFormat, RegistrationAlreadyExists, TeacherIsNotAProponent, VoteIsRepeated } from "./exceptions";

export type Registration = {
    course: string,
    teacher: string
}

export type TotalVotes = number
export class Teacher {
    private voters: Teacher[] = []
    constructor(private email: Email){}

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

    public equal (teacher: Teacher): boolean{
       return teacher.email.toString() === this.email.toString()
    }

    public toString () : string {
        return this.email.toString()
    }
}

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

        return {course: this.title, teacher: teacher.toString()}
    }

    public equal (course: Course): boolean{
        return course.title === this.title
    }

    public toString () : string {
        return this.title
    }
}

export class Email{
    private constructor(private email: string){}

    public static fromString(email: string): Email {
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

        if(email.match(emailRegex) === null){
            throw new InvalidEmailFormat(email)
        } 

        return new Email(email)
    }

    public toString(): string {
        return this.email
    }
}