import { Course, Registration, Teacher } from '../domain/model';
import { Courses as CoursesInterface, Teachers as TeachersInterface } from '../domain/repos'

export class Courses implements CoursesInterface {
    private courses : Course[] = []

    findOrCreate(course: Course): Promise<Course> {
        const existingCourse = this.courses.find(c => course.equal(c))
        if(existingCourse){
            return Promise.resolve(existingCourse)
        }

        this.courses = [...this.courses, course]
        return Promise.resolve(course)
    }

    save(course: Course): Promise<void> {
        this.courses=[...this.courses.filter(c => !course.equal(c)), course]

        return Promise.resolve()
    }

    countRegistrations(): Promise<number> {
        return Promise.resolve(
            this.courses.reduce((acc, course) => acc + (course as any).teachers.length, 0)
        )
    }

    findRegistrations(limit: number, skip: number): Promise<Registration[]> {
        const registrations = this.courses.map(
            course => (course as any).teachers.map((t: Teacher) => course.toRegistration(t)))
            .reduce((acc, val) => [ ...acc, ...val ], [])

        return Promise.resolve(registrations.slice(skip, skip + limit))
    }
}

export class Teachers implements TeachersInterface {
    private teachers : Teacher[] = []

    findOrCreate(teacher: Teacher): Promise<Teacher> {
        const existingTeacher = this.teachers.find(t => teacher.equal(t))
        if(existingTeacher){
            return Promise.resolve(existingTeacher)
        }

        this.teachers = [...this.teachers, teacher]
        return Promise.resolve(teacher)
    }

    save(teacher: Teacher): Promise<void> {
        this.teachers=[...this.teachers.filter(c => !teacher.equal(c)), teacher]

        return Promise.resolve()
    }
}