import { Course, Teacher } from "../../src/domain/model"

describe('Course', () => {
    describe('hasBeenProposedBy', () => {
        it('should return true if the teacher proposed the course', () => {
            const teacher = new Teacher('teacher@email.com')
            const course = new Course()
            course.addProponent(teacher)

            expect(course.hasBeenProposedBy(teacher)).toBe(true)
        })
    })
})