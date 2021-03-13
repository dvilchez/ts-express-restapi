export class RegistrationAlreadyExists extends Error {
    __proto__: Error;
    constructor(){
        const trueProto = new.target.prototype;
        super('Registration already exists')
        
        this.__proto__ = trueProto;
    }
}

export class TeacherIsNotAProponent extends Error {
    __proto__: Error;
    constructor(teacher: string, course: string){
        const trueProto = new.target.prototype;
        super(`The teacher ${teacher} is not a proponent of ${course}`)
        
        this.__proto__ = trueProto;
    }
}

export class VoteIsRepeated extends Error {
    __proto__: Error;
    constructor(voter: string, to: string){
        const trueProto = new.target.prototype;
        super(`The voter ${voter} has already voted for ${to}`)
        
        this.__proto__ = trueProto;
    }
}

export class InvalidEmailFormat extends Error {
    __proto__: Error;
    constructor(email: string){
        const trueProto = new.target.prototype;
        super(`${email} is not a valid email`)
        
        this.__proto__ = trueProto;
    }
}