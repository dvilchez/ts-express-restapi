export class RegistrationAlreadyExists extends Error {
    __proto__: Error;
    constructor(){
        const trueProto = new.target.prototype;
        super('Registration already exists')
        
        this.__proto__ = trueProto;
    }
}