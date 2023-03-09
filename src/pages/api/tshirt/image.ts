import { NextApiRequest, NextApiResponse } from "next";
import PrismaClient from '../../../server/db'
import jwt from 'jsonwebtoken'
import { z } from "zod";
export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method==='GET'){
        const cookie = req.cookies
        const access_token = cookie['access_token'] as string
        const payload = jwt.decode(access_token as string)
        if(typeof payload==='string' || !payload) return res.status(200).json({
            no:'no'
        })
        const ID = payload.ID
        const tshirts = await PrismaClient.tshirt.findMany({
            where:{
               created_by_ID: ID
            }
        })
        return res.status(200).json({
            tshirts
        })
    }
    if(req.method==='POST'){
        const tshirtSchema = z.object({
            image_complete64: z.string(),
            color: z.string().length(7),
            prompt: z.string(),
            image_print64: z.string()
        })
        if(!tshirtSchema.parse(req.body)){
            res.status(400).json({
                error: 'Неправильные данные'
            })
        }
        const cookie = req.cookies
        const access_token = cookie['access_token'] as string
        const payload = jwt.decode(access_token as string)
        if(typeof payload==='string' || !payload) return res.status(200).json({
            no:'no'
        })
        const ID = payload.login
        const result = await PrismaClient.tshirt.create({
            data:{
                color: req.body.color,
                image_complete64: req.body.image_complete64,
                image_print64: req.body.image_print64,
                prompt: req.body.prompt,
                created_by_ID: ID
            }
        })
        return res.status(200).json({
            result
        })

    }
}