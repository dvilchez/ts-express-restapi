import sinon from 'sinon'
import { MakeANewRegistration } from "../../src/application/makeANewRegistration"
import { RegistrationAlreadyExists } from "../../src/domain/exceptions"
import { Course, Teacher } from '../../src/domain/model'
import { Courses, Teachers } from '../../src/domain/repos'

describe('As a teacher I want to register a new course to teach', () => {
    it('should fail if the registration already exists', () => {
        const teacherEmail = 'teacher@email.com'
        const courseTitle = 'My course'
        const teacher = new Teacher(teacherEmail)
        const course = new Course()
        course.addProponent(teacher)
        const courses = {
            findOrCreate: sinon.stub().returns(course)
        } as Courses
        const teachers = {
            findOrCreate: sinon.stub().returns(teacher)
        } as Teachers

        const command = new MakeANewRegistration(courses, teachers)

        expect(() => command.execute(teacherEmail, courseTitle)).toThrow(RegistrationAlreadyExists)
    })
})