import { RegistrationAlreadyExists, TeacherIsNotAProponent, VoteIsRepeated } from "../../src/domain/exceptions"
import { Course, Email, Teacher } from "../../src/domain/model"

describe('Course', () => {
    let teacherEmail : string
    let courseTitle : string
    let teacher : Teacher
    let course: Course

    beforeEach( () => {
        teacherEmail = 'teacher@email.com'
        courseTitle = 'My Course'
        teacher = new Teacher(Email.fromString(teacherEmail))
        course = new Course(courseTitle)
    })

    describe('hasBeenProposedBy', () => {
        it('should return true if the teacher proposed the course', () => {
            course.addProponent(teacher)

            expect(course.hasBeenProposedBy(teacher)).toBe(true)
        })
    })

    describe('toRegistration', () => {
        it('should return a registration for the course and the selected teacher', () => {
            course.addProponent(teacher)

            expect(course.toRegistration(teacher))
                .toStrictEqual({
                    course: courseTitle, 
                    teacher: teacherEmail,
                    courseVotes: 0,
                    teacherVotes: 0
                })
        })

        it('should fail if the teacher is not a course proponent', () => {
            expect(() => course.toRegistration(teacher)).toThrow(TeacherIsNotAProponent)
        })
    })

    describe('equal', () => {
        it('should return true if the entity has the same identity', () => {
            const courseInstanceA = new Course('My Course')
            const courseInstanceB = new Course('My Course')

            expect(courseInstanceA.equal(courseInstanceB)).toBe(true)
        })
    })

    describe('addProponent', () => {
        it('should fail if the teacher is already a proponent', () => {
            course.addProponent(teacher)

            expect(() => course.addProponent(teacher)).toThrow(RegistrationAlreadyExists)
        })
    })

    describe('hasBeenVotedBy', () => {
        it('should return true if the voter has voted by the teacher', () => {
            course.addVote(teacher)

            expect(course.hasBeenVotedBy(teacher)).toBe(true)
        })
    })

    describe('addVote', () => {
        it('should fail if the voter has already voted', () => {
            course.addVote(teacher)

            expect(() => course.addVote(teacher)).toThrow(VoteIsRepeated)
        })
    })

    describe('totalVotes', () => {
        it('should return the total number of votes', () => {
            const voter2Email = 'voter2@email.com'
            const voter2 = new Teacher(Email.fromString(voter2Email))

            teacher.addVote(teacher)
            teacher.addVote(voter2)

            expect(teacher.totalVotes()).toBe(2)
        })
    })

    describe('toString', () => {
        it('should return the course identity as a string', () => {
            expect(course.toString()).toBe(courseTitle)
        })
    })

    describe('toRegistrations', () => {
        it('should return all the registration for the course', () => {
            course.addProponent(teacher)

            expect(course.toRegistrations()).toStrictEqual(
                [{
                    course: courseTitle, 
                    teacher: teacherEmail,
                    courseVotes: 0,
                    teacherVotes: 0 
                }])
        })
    })
})