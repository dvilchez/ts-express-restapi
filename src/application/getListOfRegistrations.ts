import { Courses } from "../domain/repos"
import { RegistrationsList } from "../domain/model"

export class GetListOfRegistrations {
    constructor(private courses: Courses){}

    public async execute(limit: number, skip: number) : Promise<RegistrationsList> {
        
        const count = await this.courses.count()
        const coursesList = await this.courses.find(limit, skip)

        return {
            total: count,
            registrations: coursesList.map(c => c.toRegistrations()).reduce((acc, val) => [ ...acc, ...val ], [])
        } as RegistrationsList
    }
}
