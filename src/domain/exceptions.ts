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