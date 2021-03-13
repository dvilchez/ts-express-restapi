export class Teacher {
    constructor(private email: string){}

    public equal (teacher: Teacher): boolean{
       return teacher.email === this.email;
    }
}

export class Course {
    private teachers: Teacher[] = []

    public hasBeenProposedBy(teacher: Teacher) : boolean {
        return this.teachers.some(t => teacher.equal(t))
    }

    public addProponent(teacher: Teacher) : void {
        this.teachers = [...this.teachers, teacher]
    }
}