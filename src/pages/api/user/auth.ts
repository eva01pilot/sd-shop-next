import checkPasswordHash from "../../../helpers/checkPasswordHash";
import PrismaClient from '../../../server/db'
import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

export default async function handler(req:NextApiRequest, res:NextApiResponse){
    if (req.method === 'GET') {
        //res.setHeader("Access-Control-Allow-Credentials", 'true')
        //res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
        const cookie = req.cookies
        const access_token = cookie['access_token']
        jwt.verify(access_token as string, process.env.JWT_SECRET as string, 
            (err, decoded) => {
                if(err){
                    res.json({
                        login:false
                    })
                }
            }
        )

        return res.json({
            access_token
        })
    }
    if(req.method==='POST'){
        
        const login = req.body.login ?? req.query.login
        const password = req.body.password ?? req.query.password
        const User = await PrismaClient.user.findFirst({
            where:{
                login:login as string,
            }
        })
        const passwordRight = await checkPasswordHash(password as string, User?.password as string)
        if(passwordRight){
            const access_token =  jwt.sign({login:User?.id}, process.env.JWT_SECRET as string,{
                expiresIn: 36000,
            })
            res.setHeader("Access-Control-Allow-Credentials", 'true')
            res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")

            res.setHeader('Set-Cookie', serialize('access_token', access_token, {
                httpOnly: true,
                path: '/'
            }))
            return res.json({
                'login': true
            })
        }
        
    }
}