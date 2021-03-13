import { Teacher } from "../../src/domain/model"

describe('Teacher', () => {
    describe('equal', () => {
        it('should return true if the entity has the same identity', () => {
            const teacherInstanceA = new Teacher('teacher@mail.com')
            const teacherInstanceB = new Teacher('teacher@mail.com')

            expect(teacherInstanceA.equal(teacherInstanceB)).toBe(true)
        })
    })
})