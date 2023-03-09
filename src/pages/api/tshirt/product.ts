import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import jwt from 'jsonwebtoken'
import PrismaClient from '../../../server/db'
export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method==='GET'){
        const cookie = req.cookies
        const access_token = cookie['access_token'] as string
        const payload = jwt.decode(access_token as string)
        if(typeof payload==='string' || !payload) return res.status(200).json({
            no:'no'
        })
        const ID = payload.login
        const result = await PrismaClient.product.findMany({
            where:{
                created_by_ID: ID
            }
        })
        return res.status(200).json({
            result
        })
    }
    if(req.method==='POST'){
        const productSchema = z.object({
            image: z.number(),
            for_sale: z.boolean(),
            price: z.number()
        })
        if(!productSchema.parse(req.body)){
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
        const result = await PrismaClient.product.create({
            data:{
                for_sale: req.body.for_sale,
                created_by_ID: ID,
                image: req.body.image,
                price: req.body.price
            }
        })
        return res.status(200).json({
            result
        })
    }
}