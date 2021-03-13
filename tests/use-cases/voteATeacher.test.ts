import sinon from "sinon"
import { Teacher } from "../../src/domain/model"
import { Teachers } from "../../src/domain/repos"
import { VoteForATeacher } from '../../src/application'

describe("As a teacher I want to vote for a teacher", () => {
    let voterEmail :string
    let teacherEmail :string
    let teachers : Teachers
    let teacher : Teacher
    let voter : Teacher

    beforeEach(() => {
        voterEmail = 'teacher@email.com'
        teacherEmail = 'teacher@email.com'
        voter = new Teacher(voterEmail)
        teacher = new Teacher(teacherEmail)
        teachers = {
            findOrCreate: sinon.stub().returns(teacher),
            save: sinon.spy()
        } as Teachers

    })

    it('should create the new vote', async ()=> {
        await new VoteForATeacher(teachers).execute(voterEmail, teacherEmail)

        const spy = teachers.save as any
        expect(spy.called).toBe(true)
        expect(spy.args[0][0].hasBeenVotedBy(voter)).toBe(true)
    })
})