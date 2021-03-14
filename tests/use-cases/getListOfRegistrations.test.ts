import sinon from 'sinon'
import { MakeANewRegistration, GetListOfRegistrations } from '../../src/application'
import { Course, Email, Teacher } from '../../src/domain/model'
import { Courses, Teachers } from '../../src/domain/repos'

describe('As a user I want to get the list of registrations', () => {
    let teacherEmail :string
    let courseTitle: string
    let courses : Courses
    let teachers : Teachers
    let teacher : Teacher
    let course : Course
    let limit: number
    let skip: number

    beforeEach(() => {
        limit = 10
        skip = 0
        teacherEmail = 'teacher@email.com'
        courseTitle = 'My course'
        teacher = new Teacher(Email.fromString(teacherEmail))
        course = new Course(courseTitle)
        courses = {
            findOrCreate: sinon.stub().returns(course),
            save: sinon.spy(),
            find: sinon.stub().returns([course]),
            count: sinon.stub().returns(100)
        } as Courses
        teachers = {
            findOrCreate: sinon.stub().returns(teacher),
            save: sinon.spy()
        } as Teachers
    })

    it('should return a list of teacher with the courses they have proposed', async () => {
        await new MakeANewRegistration(courses, teachers).execute(teacherEmail, courseTitle)

        const registrationsList = await new GetListOfRegistrations(courses).execute(limit, skip)
        expect(registrationsList.registrations[0].teacher).toBe(teacherEmail)
        expect(registrationsList.registrations[0].course).toBe(courseTitle)
        expect(registrationsList.registrations[0].teacherVotes).toBe(0)
        expect(registrationsList.registrations[0].courseVotes).toBe(0)
    })

    it('should return the total of courses in the whole list', async () => {
        await new MakeANewRegistration(courses, teachers).execute(teacherEmail, courseTitle)

        const registrationsList = await new GetListOfRegistrations(courses).execute(limit, skip)
        expect(registrationsList.total).toBe(100)
    })
})