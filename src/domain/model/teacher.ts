import { VoteIsRepeated } from "../exceptions"
import { Email } from "./email"
import { TotalVotes } from "./totalVotes"

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
