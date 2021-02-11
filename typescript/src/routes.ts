import { Request, Response } from 'express';
import createUser from './services/CreateUser';
export default function (request: Request, response: Response)  {
    const user = createUser({
        name: 'Gutemberg',
        email: 'joao@gmail.com',
        password: '12313',
        techs: {
            name: 'React',
            experience: 100,
        }
    })
    return response.json({message: 'Hello World'})
}