import sinon from 'sinon'
import { MakeANewRegistration, GetListOfRegistrations } from '../../src/application'
import { Course, Email, Registration, Teacher } from '../../src/domain/model'
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
            findRegistrations: sinon.stub().returns([{} as Registration]),
            countRegistrations: sinon.stub().returns(100)
        } as Courses
        teachers = {
            findOrCreate: sinon.stub().returns(teacher),
            save: sinon.spy()
        } as Teachers
    })

    it('should return a list of teacher with the courses they have proposed', async () => {
        await new MakeANewRegistration(courses, teachers).execute(teacherEmail, courseTitle)

        const registrationsList = await new GetListOfRegistrations(courses).execute(limit, skip)
        expect(registrationsList.registrations[0]).toBeDefined()
    })

    it('should return the total of courses in the whole list', async () => {
        await new MakeANewRegistration(courses, teachers).execute(teacherEmail, courseTitle)

        const registrationsList = await new GetListOfRegistrations(courses).execute(limit, skip)
        expect(registrationsList.total).toBe(100)
    })
})