'use client'
import axios from "axios"
import { redirect } from "next/navigation"
import { MouseEventHandler, useState } from "react"
import { useRouter } from 'next/navigation'
const page = () =>{
    const router = useRouter()
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const submitForm:MouseEventHandler = async(e) => {
        e.preventDefault()
        const res = await axios.post('http://localhost:3000/api/user/auth', {
            password,
            login,
        }, {
            withCredentials: true
        })
        if(res.data.login===true){
            const queryParams = new URLSearchParams(window.location.search)
            const back = queryParams.get('back')
            console.log(back)
            if(!back){
                router.push('/')
            }
            router.push('/' + back as string)
        }

    }
    return (
        <form className="flex justify-center items-center flex-col w-full h-[calc(100svh-5rem)]">
            <h1 className="font-sans text-2xl p-8">Войдите в аккаунт</h1>
            <div className="flex flex-row">
                <label htmlFor="login">Введите логин</label>
                <input id="login" value={login} onInput={(e)=>setLogin(e.currentTarget.value)}/>
            </div>
            <div className="flex flex-row">
                <label htmlFor="password">Введите пароль</label>
                <input id="password" onInput={(e)=>setPassword(e.currentTarget.value)} value={password}/>
            </div>
            <button onClick={submitForm}>Войти</button>
            <button onClick={()=>redirect('/signup')}>Зарегистрироваться</button>
        </form>
    )
}
export default page