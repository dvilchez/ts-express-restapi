import { TeacherIsNotAProponent } from "../../src/domain/exceptions"
import { Course, Teacher } from "../../src/domain/model"

describe('Course', () => {
    let teacherEmail : string
    let courseTitle : string
    let teacher : Teacher
    let course: Course

    beforeEach( () => {
        teacherEmail = 'teacher@email.com'
        courseTitle = 'My Course'
        teacher = new Teacher(teacherEmail)
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

            expect(course.toRegistration(teacher)).toStrictEqual({course: courseTitle, teacher: teacherEmail})
        })

        it('should fail if the teacher is not a course proponent', () => {
            expect(() => course.toRegistration(teacher)).toThrow(TeacherIsNotAProponent)
        })
    })
})