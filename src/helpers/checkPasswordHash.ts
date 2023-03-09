import bcrypt from 'bcrypt'

const checkPasswordHash = async(password: string, hash: string) =>{
    const valid = await bcrypt.compare(password, hash)
    return valid
}
export default checkPasswordHash