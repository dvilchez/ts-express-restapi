import { VoteIsRepeated } from "../../src/domain/exceptions"
import { Teacher } from "../../src/domain/model"

describe('Teacher', () => {
    describe('equal', () => {
        it('should return true if the entity has the same identity', () => {
            const teacherInstanceA = new Teacher('teacher@mail.com')
            const teacherInstanceB = new Teacher('teacher@mail.com')

            expect(teacherInstanceA.equal(teacherInstanceB)).toBe(true)
        })
    })

    describe('toString', () => {
        it('should return the teacher identity as a string', () => {
            const teacherEmail = 'teacher@mail.com'
            const teacher = new Teacher(teacherEmail)

            expect(teacher.toString()).toBe(teacherEmail)
        })
    })

    describe('hasBeenVotedBy', () => {
        it('should return true if the voter has voted by the teacher', () => {
            const voterEmail = 'voter@email.com'
            const teacherEmail = 'teacher@mail.com'
            const teacher = new Teacher(teacherEmail)
            const voter = new Teacher(voterEmail)

            teacher.addVote(voter)

            expect(teacher.hasBeenVotedBy(voter)).toBe(true)
        })
    })

    describe('addVote', () => {
        it('should fail if the voter has already voted', () => {
            const voterEmail = 'voter@email.com'
            const teacherEmail = 'teacher@mail.com'
            const teacher = new Teacher(teacherEmail)
            const voter = new Teacher(voterEmail)

            teacher.addVote(voter)

            expect(() => teacher.addVote(voter)).toThrow(VoteIsRepeated)
        })
    })

    describe('totalVotes', () => {
        it('should return the total number of votes', () => {
            const voterEmail = 'voter@email.com'
            const voter2Email = 'voter2@email.com'
            const teacherEmail = 'teacher@mail.com'
            const teacher = new Teacher(teacherEmail)
            const voter = new Teacher(voterEmail)
            const voter2 = new Teacher(voter2Email)

            teacher.addVote(voter)
            teacher.addVote(voter2)

            expect(teacher.totalVotes()).toBe(2)
        })
    })
})