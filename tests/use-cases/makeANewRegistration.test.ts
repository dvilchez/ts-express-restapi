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
        course = new Course()
        courses = {
            findOrCreate: sinon.stub().returns(course),
            save: sinon.spy()
        } as Courses
        teachers = {
            findOrCreate: sinon.stub().returns(teacher)
        } as Teachers

    })

    it('should fail if the registration already exists', async () => {

        course.addProponent(teacher)
        const command = new MakeANewRegistration(courses, teachers)

        await expect(command.execute(teacherEmail, courseTitle))
            .rejects.toThrow(RegistrationAlreadyExists)
    })

    it('should create a new registration', async () => {
        await new MakeANewRegistration(courses, teachers).execute(teacherEmail, courseTitle)

        const spy = courses.save as any
        expect(spy.called).toBe(true)
        expect(spy.args[0][0].hasBeenProposedBy(teacher)).toBe(true)
    })
})