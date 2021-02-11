
interface techs {
    name: string,
    experience: number
}

interface CreateUser {
    name?: string,
    password: string,
    email: string,
    techs: string | techs;
}

export default function createUser({ name = '', password, email } : CreateUser) {
    const user = {
        name, 
        email,
        password
    }
    return user
}
