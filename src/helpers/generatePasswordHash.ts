import bcrypt from 'bcrypt'

const generatePasswordHash = async(saltRounds: number, password: string ) =>{
    const salt = await bcrypt.genSalt(saltRounds)
    console.log(salt,password)
    const hashed = await bcrypt.hash(password, salt)
    return hashed 

}
export default generatePasswordHash