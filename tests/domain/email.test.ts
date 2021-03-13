import { Email } from '../../src/domain/model'
import { InvalidEmailFormat } from '../../src/domain/exceptions'

describe('email', () => {
    describe('fromString', () => {
        it('should validate that the email ir correct', () => {
            expect(() => Email.fromString('name#email.com')).toThrow(InvalidEmailFormat)
        })

        it('should return an email if the string is correct', () => {
            expect(Email.fromString('teacher@email.com')).toBeInstanceOf(Email)
        })
    })

    describe('toString', () => {
        it('should return the teacher identity as a string', () => {
            const emailString = 'teacher@mail.com'
            const email = Email.fromString(emailString)

            expect(email.toString()).toBe(emailString)
        })
    })
})