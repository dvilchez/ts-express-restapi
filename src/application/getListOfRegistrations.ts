import { Courses } from "../domain/repos"
import { RegistrationsList } from "../domain/model"

export class GetListOfRegistrations {
    constructor(private courses: Courses){}

    public async execute(limit: number, skip: number) : Promise<RegistrationsList> {
        
        const count = await this.courses.countRegistrations()
        const registrations = await this.courses.findRegistrations(limit, skip)

        return {
            total: count,
            registrations: registrations
        } as RegistrationsList
    }
}
