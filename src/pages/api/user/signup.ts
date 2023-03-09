import  PrismaClient  from '../../../server/db'
import { z } from 'zod'
import generatePasswordHash from '../../../helpers/generatePasswordHash'
import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

export default async function handler(req : NextApiRequest, res: NextApiResponse){
    if(req.method==='POST'){
        const userSchema = z.object({
            login: z.string().min(4),
            password: z.string(),
            avatar: z.string()
        })
        if(!userSchema.parse(req.query)){
            res.status(400).json({
                error: 'Неправильные данные'
            })
        }
        const hashedPassword = await generatePasswordHash(10, req.query.password as string)
        const loginIsOccupied = await PrismaClient.user.findFirst({
            where: {
                login: req.query.login as string
            }
        })
        if(loginIsOccupied?.id){
            res.status(400).json({
                error: 'Никнейм уже занят'
            })
        }
        const User = await PrismaClient.user.create({
            data:{
                login: req.query.login as string,
                password: hashedPassword,
                avatar: req.query.avatar as string,
            }
        })
        const accessToken = jwt.sign(User.id.toString(), process.env.JWT_SECRET as string,{
            expiresIn: 36000
        })
        res.setHeader("Access-Control-Allow-Credentials", 'true')
            res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
            res.setHeader('Set-Cookie', serialize('access_token', accessToken, {
                path: '/',
                httpOnly: true
            }))
        res.status(200).json({
            ...User,
        })
    }
}
