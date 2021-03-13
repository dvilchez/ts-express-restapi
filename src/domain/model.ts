import { TeacherIsNotAProponent } from "./exceptions";

export type Registration = {
    course: string,
    teacher: string
}
export class Teacher {
    constructor(private email: string){}

    public equal (teacher: Teacher): boolean{
       return teacher.email === this.email;
    }

    public toString () : string {
        return this.email;
    }
}

export class Course {
    private teachers: Teacher[] = []

    constructor(private title: string){}

    public hasBeenProposedBy(teacher: Teacher) : boolean {
        return this.teachers.some(t => teacher.equal(t))
    }

    public addProponent(teacher: Teacher) : void {
        this.teachers = [...this.teachers, teacher]
    }

    public toRegistration(teacher: Teacher) : Registration {
        if(!this.hasBeenProposedBy(teacher)){
            throw new TeacherIsNotAProponent(teacher.toString(), this.title)
        }

        return {course: this.title, teacher: teacher.toString()}
    }
}