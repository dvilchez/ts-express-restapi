export type Registration = {
    course: string,
    teacher: string,
    teacherVotes: number,
    courseVotes: number
}

export type RegistrationsList = {
    total: number
    registrations: Registration[]
}