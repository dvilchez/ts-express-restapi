import { InvalidEmailFormat } from "../exceptions"

export class Email{
    private constructor(private email: string){}

    public static fromString(email: string): Email {
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

        if(email.match(emailRegex) === null){
            throw new InvalidEmailFormat(email)
        } 

        return new Email(email)
    }

    public toString(): string {
        return this.email
    }
}
