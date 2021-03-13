import { VoteIsRepeated } from "../../src/domain/exceptions"
import { Email, Teacher } from "../../src/domain/model"

describe('Teacher', () => {
    let teacher: Teacher
    let teacherEmail: string
    let voter: Teacher
    let voterEmail: string

    beforeEach(() => {
        teacherEmail = 'teacher@mail.com'
        teacher = new Teacher(Email.fromString(teacherEmail))
        voterEmail = 'voter@email.com'
        voter = new Teacher(Email.fromString(voterEmail))

    })

    describe('equal', () => {
        it('should return true if the entity has the same identity', () => {
            const teacher2 = new Teacher(Email.fromString(teacherEmail))

            expect(teacher.equal(teacher2)).toBe(true)
        })
    })

    describe('toString', () => {
        it('should return the teacher identity as a string', () => {
            expect(teacher.toString()).toBe(teacherEmail)
        })
    })

    describe('hasBeenVotedBy', () => {
        it('should return true if the voter has voted by the teacher', () => {
            teacher.addVote(voter)

            expect(teacher.hasBeenVotedBy(voter)).toBe(true)
        })
    })

    describe('addVote', () => {
        it('should fail if the voter has already voted', () => {
            teacher.addVote(voter)

            expect(() => teacher.addVote(voter)).toThrow(VoteIsRepeated)
        })
    })

    describe('totalVotes', () => {
        it('should return the total number of votes', () => {
            const voter2Email = 'voter2@email.com'
            const voter2 = new Teacher(Email.fromString(voter2Email))

            teacher.addVote(voter)
            teacher.addVote(voter2)

            expect(teacher.totalVotes()).toBe(2)
        })
    })
})