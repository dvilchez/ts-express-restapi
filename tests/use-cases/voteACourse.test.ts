import sinon from "sinon"
import { Email, Teacher, Course } from "../../src/domain/model"
import { Teachers, Courses } from "../../src/domain/repos"
import { VoteForACourse } from '../../src/application'

describe("As a teacher I want to vote for a course", () => {
    let voterEmail :string
    let courseTitle: string
    let teachers : Teachers
    let courses : Courses
    let voter : Teacher
    let course: Course

    beforeEach(() => {
        voterEmail = 'teacher@email.com'
        courseTitle = 'My Course'
        voter = new Teacher(Email.fromString(voterEmail))
        course = new Course(courseTitle)
        teachers = {
            findOrCreate: sinon.stub().returns(voter),
            save: sinon.spy()
        } as Teachers
        courses = {
            findOrCreate: sinon.stub().returns(course),
            save: sinon.spy(),
            findRegistrations: sinon.stub(),
            countRegistrations: sinon.stub()
        } as Courses

    })

    it('should create the new vote', async ()=> {
        await new VoteForACourse(teachers, courses).execute(voterEmail, courseTitle)

        const spy = courses.save as any
        expect(spy.called).toBe(true)
        expect(spy.args[0][0].hasBeenVotedBy(voter)).toBe(true)
    })

    it('should return the number of votes', async () => {
        const res = await new VoteForACourse(teachers, courses).execute(voterEmail, courseTitle)

        expect(res).toBe(1)
    })
})
