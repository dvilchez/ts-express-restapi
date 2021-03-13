import sinon from 'sinon'
import { MakeANewRegistration } from "../../src/application/makeANewRegistration"
import { RegistrationAlreadyExists } from "../../src/domain/exceptions"
import { Course, Teacher } from '../../src/domain/model'
import { Courses, Teachers } from '../../src/domain/repos'

describe('As a teacher I want to register a new course to teach', () => {
    let teacherEmail :string
    let courseTitle: string
    let courses : Courses
    let teachers : Teachers
    let teacher : Teacher
    let course : Course

    beforeEach(() => {
        teacherEmail = 'teacher@email.com'
        courseTitle = 'My course'
        teacher = new Teacher(teacherEmail)
        course = new Course(courseTitle)
        courses = {
            findOrCreate: sinon.stub().returns(course),
            save: sinon.spy()
        } as Courses
        teachers = {
            findOrCreate: sinon.stub().returns(teacher),
            save: sinon.spy()
        } as Teachers

    })

    it('should create a new registration', async () => {
        await new MakeANewRegistration(courses, teachers).execute(teacherEmail, courseTitle)

        const spy = courses.save as any
        expect(spy.called).toBe(true)
        expect(spy.args[0][0].hasBeenProposedBy(teacher)).toBe(true)
    })

    it('should return the registration', async () => {
        const res = await new MakeANewRegistration(courses, teachers).execute(teacherEmail, courseTitle)

        const spy = courses.save as any
        expect(res).toStrictEqual(spy.args[0][0].toRegistration(teacher))
    })
})